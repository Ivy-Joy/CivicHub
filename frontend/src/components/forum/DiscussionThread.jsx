// frontend/src/components/forum/DiscussionThread.jsx
import React, { useState } from 'react';

export default function DiscussionThread({ discussion }) {
  const [comments, setComments] = useState(discussion.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleComment = () => {
    if (!newComment) return;
    const comment = { id: Date.now(), text: newComment };
    setComments((prev) => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{discussion.title}</h2>
      <p className="text-gray-700">{discussion.content}</p>

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold text-gray-800">Comments</h3>
        {comments.map((c) => (
          <div key={c.id} className="p-3 bg-gray-100 rounded">
            {c.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleComment}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Comment
        </button>
      </div>
    </div>
  );
}