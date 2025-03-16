import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserSection } from '../components/UserSection';
import { GitHubUser } from '../types/github';

const mockUser: GitHubUser = {
  login: 'test-user',
  id: 123,
  avatar_url: 'https://example.com/avatar.png',
  html_url: 'https://github.com/test-user',
};

describe('UserSection', () => {
  it('renders the user login name', () => {
    render(<UserSection user={mockUser} isExpanded={false} onToggle={() => {}} />);
    const username = screen.getByText('test-user');
    expect(username).not.toBeNull();
  });

  it('shows ChevronDown icon when collapsed', () => {
    render(<UserSection user={mockUser} isExpanded={false} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    const chevronDown = button.querySelector('svg');
    expect(chevronDown).not.toBeNull();
  });

  it('shows ChevronUp icon when expanded', () => {
    render(<UserSection user={mockUser} isExpanded={true} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    const chevronUp = button.querySelector('svg');
    expect(chevronUp).not.toBeNull();
  });

  it('shows Loader2 icon when loading', () => {
    render(<UserSection user={mockUser} isExpanded={true} isLoading={true} onToggle={() => {}} />);
    const loaderIcon = screen.getByRole('button').querySelector('svg.animate-spin');
    expect(loaderIcon).not.toBeNull(); // Pastikan ikon loader muncul
  });

  it('calls onToggle when button is clicked', () => {
    const handleToggle = vi.fn();
    render(<UserSection user={mockUser} isExpanded={false} onToggle={handleToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('renders children when expanded', () => {
    render(
      <UserSection user={mockUser} isExpanded={true} onToggle={() => {}}>
        <div data-testid="child-content">Child Content</div>
      </UserSection>
    );
    
    const childContent = screen.getByTestId('child-content');
    expect(childContent).not.toBeNull(); 
  });

  it('does not render children when collapsed', () => {
    render(
      <UserSection user={mockUser} isExpanded={false} onToggle={() => {}}>
        <div data-testid="child-content">Child Content</div>
      </UserSection>
    );
    
    const childContent = screen.queryByTestId('child-content');
    expect(childContent).toBeNull(); 
  });
});
