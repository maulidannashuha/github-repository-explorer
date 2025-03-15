import { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { Button } from './components/Button';
import { RepositoryCard } from './components/RepositoryCard';
import { UserSection } from './components/UserSection';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState('Exampleuser1');

  const mockRepositories = [
    { title: 'Repository title', description: 'Repository description', stars: 12 },
    { title: 'Repository title', description: 'Repository description', stars: 48 },
    { title: 'Repository title', description: 'Repository description', stars: 23 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg p-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Exampleuser"
        />
        <div className="mt-4">
          <Button>Search</Button>
        </div>

        <div className='mt-2 text-gray-500'>
          Showing users for "asfsf"
        </div>
        
        <div className="mt-2">
          <UserSection
            username="Exampleuser1"
            isExpanded={expandedUser === 'Exampleuser1'}
            onToggle={() => setExpandedUser(expandedUser === 'Exampleuser1' ? '' : 'Exampleuser1')}
          >
            {mockRepositories.map((repo, index) => (
              <RepositoryCard
                key={index}
                title={repo.title}
                description={repo.description}
                stars={repo.stars}
              />
            ))}
          </UserSection>

          <UserSection
            username="Exampleuser431"
            isExpanded={expandedUser === 'Exampleuser431'}
            onToggle={() => setExpandedUser(expandedUser === 'Exampleuser431' ? '' : 'Exampleuser431')}
          >
            {mockRepositories.map((repo, index) => (
              <RepositoryCard
                key={index}
                title={repo.title}
                description={repo.description}
                stars={repo.stars}
              />
            ))}
          </UserSection>
        </div>
      </div>
    </div>
  );
}

export default App;