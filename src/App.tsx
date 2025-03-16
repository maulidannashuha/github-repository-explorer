import { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { Button } from './components/Button';
import { RepositoryCard } from './components/RepositoryCard';
import { UserSection } from './components/UserSection';
import { searchUsers, getUserRepos } from './services/github';
import { GitHubUser, GitHubRepo } from './types/github';
import { Loader2 } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTerm, setSearchedTerm] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userRepos, setUserRepos] = useState<Record<string, GitHubRepo[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearchedTerm(searchTerm);
    setUsers([]);
    setHasSearched(true);
    setIsLoading(true);
    setError(null);
    try {
      const foundUsers = await searchUsers(searchTerm);
      setUsers(foundUsers);
      setExpandedUser(null);
      setUserRepos({});
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserToggle = async (username: string) => {
    if (expandedUser === username) {
      setExpandedUser(null);
      return;
    }

    setExpandedUser(username);
    if (!userRepos[username]) {
      setIsLoadingRepo(true)
      try {
        const repos = await getUserRepos(username);
        setUserRepos(prev => ({ ...prev, [username]: repos }));
      } catch (err) {
        console.error('Repository fetch error:', err);
        setError(`Failed to load repositories for ${username}`);
      }
      setIsLoadingRepo(false)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg p-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search GitHub users..."
          onKeyDown={handleKeyDown}
        />
        <div className="mt-4">
          <Button
            onClick={handleSearch}
            className="w-24"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Search'}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        { hasSearched && !isLoading ?
          <div className='mt-2 text-gray-500'>
            Showing users for "{searchedTerm}"
          </div> : ''
        }
        
        <div className="mt-2">
          {hasSearched && users.length === 0 && searchedTerm && !isLoading && !error && (
            <p className="text-center text-gray-600">No users found</p>
          )}
          
          {users.map(user => (
            <UserSection
              key={user.id}
              user={user}
              isExpanded={expandedUser === user.login}
              onToggle={() => handleUserToggle(user.login)}
              isLoading={isLoadingRepo && user.login === expandedUser}
            >
              {!isLoadingRepo && userRepos[user.login]?.length === 0 && !error && (
                <p className="text-center text-gray-600">No repositories found</p>
              )}

              {userRepos[user.login]?.map(repo => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </UserSection>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;