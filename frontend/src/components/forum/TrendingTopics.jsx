// frontend/src/components/forum/TrendingTopics.jsx
import React from 'react';

export default function TrendingTopics({ topics }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <h3 className="font-semibold text-lg">Trending Topics</h3>
      <ul className="space-y-1">
        {topics.map((t, i) => (
          <li key={i} className="text-blue-600 hover:underline cursor-pointer">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}