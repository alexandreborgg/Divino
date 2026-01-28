
import React from 'react';
import { GuidanceTopic } from '../types';
import { TOPIC_PROMPTS } from '../constants';

interface TopicActionsProps {
  onSelect: (prompt: string) => void;
}

const TopicActions: React.FC<TopicActionsProps> = ({ onSelect }) => {
  const topics = Object.values(GuidanceTopic);

  return (
    <div className="flex flex-wrap gap-2 justify-center py-4">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(TOPIC_PROMPTS[topic])}
          className="px-4 py-1.5 bg-[#faedcd] hover:bg-[#d4a373] hover:text-white transition-all duration-300 rounded-full text-[#a98467] text-xs font-medium border border-[#d4a373]/20 shadow-sm"
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicActions;
