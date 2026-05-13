// frontend/src/components/forum/NewDiscussionForm.jsx
import React, { useState } from 'react';

export default function NewDiscussionForm({ onAddDiscussion }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Finance');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddDiscussion({ id: Date.now(), title, category, content, comments: [] });
    setTitle('');
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-lg font-semibold">Start a New Discussion</h2>
      <input
        type="text"
        placeholder="Discussion title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option>Finance</option>
        <option>Constitution</option>
        <option>Leadership</option>
        <option>General Civic Issues</option>
      </select>
      <textarea
        placeholder="Write your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded h-24"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  );
}