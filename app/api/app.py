from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from datetime import datetime
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models import mobilenet_v3_large
from torchvision import transforms
from torch import nn
from PIL import Image
import io
import json
import os
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.transform import GeneralizedRCNNTransform
from torchvision.models.detection.anchor_utils import AnchorGenerator
import torch.optim as optim

app = Flask(__name__)
CORS(app)

model = fasterrcnn_resnet50_fpn(pretrained = True)
mobilenet_v3 = mobilenet_v3_large(pretrained=True)
backbone = mobilenet_v3.features

class MobileNetV3Backbone(nn.Module):
    def __init__(self, backbone, out_channels=256):
        super(MobileNetV3Backbone, self).__init__()
        self.backbone = backbone
        self.out_channels = out_channels
        self.conv = nn.Conv2d(960, self.out_channels, kernel_size=3, stride=1, padding=1)

    def forward(self, x):
        x = self.backbone(x)
        x = self.conv(x)
        return {"0": x}

custom_backbone = MobileNetV3Backbone(backbone=mobilenet_v3.features)

model = FasterRCNN(
    custom_backbone,
    num_classes=8,
)

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

model.transform = GeneralizedRCNNTransform(
    min_size=[224],
    max_size=224,
    image_mean=mean,
    image_std=std
)

anchor_sizes = ((32,),)
aspect_ratios = ((0.5, 1.0, 2.0),)
anchor_generator = AnchorGenerator(anchor_sizes, aspect_ratios)
model.rpn.anchor_generator = anchor_generator

optimizer = optim.Adam(
    model.parameters(),
    lr=0.0001,
    weight_decay=0.0005
)

checkpoint_path = "model_epoch_13.pth"
checkpoint = torch.load(checkpoint_path, weights_only=True)

model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
model.eval()

transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

CLASSES = {
    1: 'Spider',
    2: 'Swiss Cheese',
    3: 'Bright Dune',
    4: 'Dark Dune',
    5: 'Crater',
    6: 'Impact Ejecta',
    7: 'Slope Streak'
}

@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read()))
    
    image_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        predictions = model(image_tensor)
        
    detections = []
    for box, label, score in zip(predictions[0]['boxes'], predictions[0]['labels'], predictions[0]['scores']):
        if score > 0.6:
            detections.append({
                'bbox': box.tolist(),
                'label': CLASSES[label.item()],
                'confidence': score.item()
            })
    
    return jsonify({'detections': detections})

@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    print(f"data ========== {data}")

    feedback_data = {
        'rating': data['rating'],
        'comment': data['comment'],
        'detections': data['detections'],
        'status': data['status'],
        'timestamp': datetime.now().isoformat()
    }
    
    with open('feedback.json', 'a') as f:
        json.dump(feedback_data, f)
        f.write('\n')
    
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)

