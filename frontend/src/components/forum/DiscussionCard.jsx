// frontend/src/components/forum/DiscussionCard.jsx
import React from 'react';

export default function DiscussionCard({ discussion, onClick }) {
  return (
    <div
      onClick={() => onClick(discussion.id)}
      className="cursor-pointer p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-800">{discussion.title}</h3>
      <p className="text-gray-600 mt-1 line-clamp-2">{discussion.excerpt}</p>
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <span>{discussion.comments.length} comments</span>
        <span>{discussion.category}</span>
      </div>
    </div>
  );
}