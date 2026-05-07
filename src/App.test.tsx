import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock scroll functions as they are not available in JSDOM
window.HTMLElement.prototype.scrollTo = vi.fn();

describe('App Component', () => {
  it('renders the welcome screen by default', () => {
    render(<App />);
    expect(screen.getByText(/Meet/i)).toBeInTheDocument();
    // Use getAllByText as "Fronix.ai" appears in both the title and the disclaimer
    const titleElements = screen.getAllByText(/Fronix.ai/i);
    expect(titleElements.length).toBeGreaterThanOrEqual(1);
    expect(titleElements[0]).toBeInTheDocument();
  });

  it('toggles the sidebar when the collapse button is clicked', () => {
    render(<App />);
    const sidebar = screen.getByRole('complementary');
    // Initially open (desktop default in my implementation)
    expect(sidebar).toBeInTheDocument();
    
    // Find the toggle button in the header (which appears when sidebar is closed) or the one in sidebar
    const collapseBtn = screen.getByRole('button', { name: /caretleft/i }); // Using the phosphor icon name as a hint or aria-label
    fireEvent.click(collapseBtn);
    
    // We expect the width to animate to 0, but in JSDOM we check if state changed or if button in header appeared
    const openBtn = screen.getByRole('button', { name: /list/i });
    expect(openBtn).toBeInTheDocument();
  });

  it('opens the settings modal', () => {
    render(<App />);
    const settingsBtn = screen.getByText(/Settings/i);
    fireEvent.click(settingsBtn);
    expect(screen.getByText(/API Configuration/i)).toBeInTheDocument();
  });

  it('opens the auth modal', () => {
    render(<App />);
    const signInBtn = screen.getByText(/Sign In/i);
    fireEvent.click(signInBtn);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });
});
