// frontend/src/pages/ForumPage.jsx
import React, { useState } from 'react';
import DiscussionCard from '../components/forum/DiscussionCard';
import DiscussionThread from '../components/forum/DiscussionThread';
import NewDiscussionForm from '../components/forum/NewDiscussionForm';
import TrendingTopics from '../components/forum/TrendingTopics';

// Mock Data
const mockDiscussions = [
  {
    id: 1,
    title: 'Finance Bill 2026 Discussion',
    category: 'Finance',
    excerpt: 'Let’s discuss the implications of the Finance Bill for citizens...',
    content: 'Full content about Finance Bill 2026...',
    comments: [{ id: 101, text: 'Important for our taxes!' }],
  },
  {
    id: 2,
    title: 'Inactive Leaders and Accountability',
    category: 'Leadership',
    excerpt: 'How do we hold our elected leaders accountable for inaction?',
    content: 'Full content about leadership accountability...',
    comments: [],
  },
  {
    id: 3,
    title: 'Constitution Amendments Debate',
    category: 'Constitution',
    excerpt: 'Share your thoughts on the proposed constitutional changes...',
    content: 'Full content about constitution amendments...',
    comments: [],
  },
];

const trendingTopics = [
  'Finance Bill 2026',
  'Inactive Governors',
  'Voter Registration Updates',
  'Constitutional Rights',
];

export default function ForumPage() {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const addDiscussion = (newDiscussion) => {
    setDiscussions((prev) => [newDiscussion, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <NewDiscussionForm onAddDiscussion={addDiscussion} />

          {!selectedDiscussion ? (
            <div className="space-y-4">
              {discussions.map((d) => (
                <DiscussionCard
                  key={d.id}
                  discussion={d}
                  onClick={setSelectedDiscussion}
                />
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedDiscussion(null)}
                className="mb-4 text-blue-600 hover:underline"
              >
                ← Back to discussions
              </button>
              <DiscussionThread discussion={selectedDiscussion} />
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <TrendingTopics topics={trendingTopics} />
        </div>
      </div>
    </div>
  );
}