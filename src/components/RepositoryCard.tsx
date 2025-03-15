import React from 'react';
import { Star } from 'lucide-react';

interface RepositoryCardProps {
  title: string;
  description: string;
  stars: number;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  title,
  description,
  stars,
}) => {
  return (
    <div className="w-full p-4 bg-gray-200 hover:bg-gray-300 mb-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{stars}</span>
          <Star size={16} strokeWidth={0} fill='bg-gray-600' />
        </div>
      </div>
    </div>
  );
};