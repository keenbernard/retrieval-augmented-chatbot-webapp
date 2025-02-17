import { render, screen } from '@testing-library/react';
import App from '../App';
import fetchMock from 'jest-fetch-mock';
import React from 'react';


// Mock dependencies
jest.mock('@azure/msal-react', () => ({
  AuthenticatedTemplate: ({ children }) => <>{children}</>,
  useMsalAuthentication: jest.fn(),
}));

jest.mock('../components/Sidebar/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../components/Microsoft/ProfileContent', () => () => <div data-testid="profile-content">Profile</div>);
jest.mock('../components/Microsoft/SignOutButton', () => () => <button data-testid="sign-out">Sign Out</button>);

// Mock the port configuration
jest.mock('../portConfigurtion', () => ({
  localPort: 3001,
}));

beforeAll(() => {
  // ✅ Mock scrollTo to prevent test errors
  window.HTMLElement.prototype.scrollTo = jest.fn();
});

describe('App Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders App component without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out')).toBeInTheDocument();
  });

});
