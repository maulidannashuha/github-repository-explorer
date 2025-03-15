import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface UserSectionProps {
  username: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export const UserSection: React.FC<UserSectionProps> = ({
  username,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-2 bg-gray-100 hover:bg-gray-200"
      >
        <span className="text-gray-900">{username}</span>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-600" />
        ) : (
          <ChevronDown size={20} className="text-gray-600" />
        )}
      </button>
      {isExpanded && <div className="mt-2 ml-6">{children}</div>}
    </div>
  );
};