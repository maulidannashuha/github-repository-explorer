import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RepositoryCard } from '../components/RepositoryCard';

const mockRepo = {
  id: 1,
  name: 'test-repo',
  description: 'Test repository description',
  stargazers_count: 10,
  html_url: 'https://github.com/test/test-repo',
};

describe('RepositoryCard', () => {
  it('renders repository information correctly', () => {
    render(<RepositoryCard repo={mockRepo} />);
    
    expect(screen.getByText(mockRepo.name)).toBeTruthy();
    expect(screen.getByText(mockRepo.description!)).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('renders "No description available" when description is null', () => {
    const repoWithoutDesc = { ...mockRepo, description: null };
    render(<RepositoryCard repo={repoWithoutDesc} />);
    
    expect(screen.getByText('No description available')).toBeTruthy();
  });
});