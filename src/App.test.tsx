import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as githubService from './services/github';
import { GitHubRepo } from './types/github';

vi.mock('./services/github');

const mockUsers = [
  { login: 'user1', id: 1, avatar_url: '', html_url: '' },
  { login: 'user2', id: 2, avatar_url: '', html_url: '' },
];

const mockRepos: GitHubRepo[] = [
  { id: 101, name: 'repo1', html_url: 'https://github.com/user1/repo1', description: 'First repo', stargazers_count: 10 },
  { id: 102, name: 'repo2', html_url: 'https://github.com/user1/repo2', description: null, stargazers_count: 20 },
];

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the search input and button', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Search GitHub users...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
  });

  it('performs a search and displays users', async () => {
    vi.spyOn(githubService, 'searchUsers').mockResolvedValue(mockUsers);

    render(<App />);

    const input = screen.getByPlaceholderText('Search GitHub users...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('user1')).not.toBeNull();
      expect(screen.getByText('user2')).not.toBeNull();
    });
  });

it('handles API errors gracefully', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  vi.spyOn(githubService, 'searchUsers').mockRejectedValue(new Error('API Error'));

  render(<App />);

  const input = screen.getByPlaceholderText('Search GitHub users...');
  const button = screen.getByRole('button', { name: /search/i });

  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Failed to search users. Please try again.')).not.toBeNull();
  });

  vi.restoreAllMocks();
});

  it('expands a user section and loads repositories', async () => {
    vi.spyOn(githubService, 'searchUsers').mockResolvedValue(mockUsers);
    vi.spyOn(githubService, 'getUserRepos').mockResolvedValue(mockRepos);

    render(<App />);

    const input = screen.getByPlaceholderText('Search GitHub users...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('user1')).not.toBeNull();
    });

    fireEvent.click(screen.getByText('user1'));

    await waitFor(() => {
      expect(screen.getByText('repo1')).not.toBeNull();
      expect(screen.getByText('repo2')).not.toBeNull();
    });
  });

  it('shows "No repositories found" when user has no repositories', async () => {
    vi.spyOn(githubService, 'searchUsers').mockResolvedValue(mockUsers);
    vi.spyOn(githubService, 'getUserRepos').mockResolvedValue([]);

    render(<App />);

    const input = screen.getByPlaceholderText('Search GitHub users...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('user1')).not.toBeNull();
    });

    fireEvent.click(screen.getByText('user1'));

    await waitFor(() => {
      expect(screen.getByText('No repositories found')).not.toBeNull();
    });
  });
});
