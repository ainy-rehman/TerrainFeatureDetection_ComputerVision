# Unveiling Martian Geology Using Faster R-CNN: Detecting Features and Exploring Habitability

**A customized Faster R-CNN object detector that finds and classifies geological features in Martian surface imagery, deployed as an interactive web application.**

MS Artificial Intelligence Thesis · NED University of Engineering & Technology, Karachi - Dec 2024
<br>
Supervisors: Dr. Muhammad Ali Ismail and Uzair Abid

## Overview

Mapping Martian terrain by hand is slow and subjective. This project automates it: a Faster R-CNN model with a lightweight **MobileNetV3 backbone** and a **custom anchor generator** detects seven classes of geological features in Mars images, and a web app lets anyone upload an image, see the detections with confidence scores, and leave feedback.

**Detected classes:** bright dunes · dark dunes · craters · impact ejecta · slope streaks · spiders · Swiss cheese terrain

The work was also presented orally at the **9th Arab Conference on Astronomy and Geophysics (ACAG-9), Cairo, October 2025**.
<br>
**<a href="https://docs.google.com/viewerng/viewer?url=https://acag-conf.org/wp-content/uploads/2025/10/ACAG9-Abstract-BOOK.pdf" target="_blank">Abstract on Page No 14</a>**

## Key Results

| Metric | Value |
|---|---|
| mAP (threshold 0.5) | **0.7143** (up from 44% for the baseline in the thesis) |
| Best precision / recall trade-off (threshold 0.7) | **0.9474 precision · 0.5844 recall** |

Precision and recall across confidence thresholds:

| Threshold | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 |
|---|---|---|---|---|---|---|---|
| Precision | 0.5967 | 0.6462 | 0.7609 | 0.7971 | 0.8333 | **0.9474** | 0.9412 |
| Recall | 0.6034 | 0.5811 | 0.5407 | 0.5407 | 0.5446 | **0.5844** | 0.5649 |

A high threshold keeps false positives low, which matters when detections inform planetary analysis.

## Approach

**Dataset.** About 6,000 grayscale Mars surface images (227×227 px) from the University of Arizona library. The images came without annotations, so I labeled them manually with bounding boxes (Roboflow, then Supervisely) and exported them in COCO JSON. Preprocessing covered class merging and renaming, batch resizing with bounding-box adjustment, and a train / validation / test split. Normalization is applied dynamically during training.

**Model.** Faster R-CNN, customized in three places:
- **Backbone:** MobileNetV3 in place of the default ResNet-50, for lower compute and better behavior on a small dataset
- **Anchor generator:** custom anchor sizes and aspect ratios for small and irregular terrain features
- **Input transform:** `GeneralizedRCNNTransform` with 224×224 resizing and normalization

**Training.** Adam (lr 0.0001, weight decay 0.0005), StepLR (×0.1 every 5 epochs), 15 epochs, gradient clipping at 1.0, with a checkpoint saved every epoch.

## Web Application

A React + TypeScript + Tailwind CSS frontend talks to a FastAPI backend that loads the trained model and serves predictions. Users upload an image, get detected features with confidence scores, and can rate the result and leave comments, which are stored in a database for later model refinement.

**Home page**
![Home page](docs/images/home.png)

**Upload an image to run detection**
![Image upload](docs/images/upload.png)

**Detection result with confidence score and feedback form**
![Detection results](docs/images/results.png)

**Positive feedback submitted**
![Feedback submitted](docs/images/feedback.png)

### Sample Images

Try the app with the images in [`app/sample-images/`](app/sample-images/) (credit: [source, e.g. NASA/JPL/University of Arizona HiRISE]):

| | | |
|---|---|---|
| ![Craters](app/sample-images/sample_crater.jpg) | ![Slope streaks](app/sample-images/sample_slope_streak.jpg) | ![Dunes](app/sample-images/sample_dune.jpg) |
| Craters | Slope streaks | Dunes |

<!-- Replace the three sample files above with your own small images (under about 200 KB each), and add or remove columns as needed. -->

## Repository Structure

```text
.
├── notebook/        # Jupyter notebooks: data preparation, training, evaluation
├── app/
│   ├── api/                # FastAPI backend and model inference
│   ├── src/                # React + TypeScript frontend
│   │   └── assets/         # Images used by the UI (logo, home page cards)
│   ├── public/             # Static files served as-is
│   └── sample-images/      # Small Mars images for trying the app
├── docs/
│   └── images/
│       ├── home.png        # Home page screenshot
│       ├── upload.png      # Upload screen screenshot
│       ├── results.png     # Detection result + feedback form screenshot
│       └── feedback.png    # Feedback submitted screenshot
└── README.md
```

## Running the Application

> The trained model weights are **not included** in this repository, so inference needs your own weights file.

**Backend**
```bash
cd app
pip install -r requirements.txt
# place the weights file in app/api/ and set its path in the backend config
# start the API: [your command, e.g. uvicorn main:app --reload]
```

**Frontend**
```bash
cd app
npm install
npm run dev
```

## Limitations and Future Work

- Class imbalance: some classes (e.g. craters, dunes) are over-represented, which can hurt detection of rarer classes.
- Small or poorly defined features are missed at low confidence thresholds.
- Next steps: more labeled data for underrepresented classes, alternative backbones and ROI settings, and hyperparameter tuning.

## Tech Stack

Python · PyTorch · Faster R-CNN · MobileNetV3 · FastAPI · React · TypeScript · Tailwind CSS · Vite · Jupyter

## Author

**Bibi Ainy** · [LinkedIn](https://linkedin.com/in/ainy-rehman) · [GitHub](https://github.com/ainy-rehman)
