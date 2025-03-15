import axios from 'axios';
import { GitHubUser, GitHubRepo } from '../types/github';

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await github.get(`/search/users?q=${query}&per_page=5`);
  return response.data.items;
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await github.get(`/users/${username}/repos?sort=updated`);
  return response.data;
};