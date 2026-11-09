// import React from 'react';

// interface FeedbackButtonsProps {
//   onSubmit: (isCorrect: boolean) => void;
// }

// const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onSubmit }) => {
//   return (
//     <div className="mt-8 text-center">
//       <p className="text-gray-700 mb-4">Were these detections accurate?</p>
//       <div className="space-x-4">
//         <button
//           onClick={() => onSubmit(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Yes, Correct
//         </button>
//         <button
//           onClick={() => onSubmit(false)}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           No, Incorrect
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FeedbackButtons;

import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface FeedbackButtonsProps {
  onSubmit: (rating: number, comment: string) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">How satisfied are you with the detection?</h3>
      
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= (hoveredStar || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comments (optional)"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md text-white
          ${rating > 0
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
          }`}
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackButtons;