import React from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { GitHubUser } from '../types/github';

interface UserSectionProps {
  user: GitHubUser;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const UserSection: React.FC<UserSectionProps> = ({
  user,
  isExpanded,
  onToggle,
  children,
  isLoading = false,
}) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-2 bg-gray-100 hover:bg-gray-200"
      >
        <span className="text-gray-900">{user.login}</span>
        {isLoading ? (
          <Loader2 size={20} className="text-blue-500 animate-spin" />
        ): isExpanded ? (
          <ChevronUp size={20} className="text-gray-600" />
        ) : (
          <ChevronDown size={20} className="text-gray-600" />
        )}
      </button>
      {isExpanded && <div className="mt-2 ml-6">{children}</div>}
    </div>
  );
};