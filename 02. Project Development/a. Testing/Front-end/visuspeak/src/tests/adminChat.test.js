/*
  In this file we conducted testing for Admin Chat
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminChat from '../modules/AdminChat';

describe('AdminChat component', () => {
  // Rendering all components
  it('rendering all components', () => {
    render(<AdminChat />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('chats')).toBeInTheDocument();
    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.getByTestId('input-area')).toBeInTheDocument();
  });

  // Test initial usestate
  it('initializes state correctly', () => {
    render(<AdminChat />);
    expect(screen.getByTestId('left-panel')).toHaveStyle('width: 35%');
    expect(screen.getByTestId('right-panel')).toHaveStyle('width: 65%');
    expect(screen.queryByTestId('alert')).toBeNull();
  });

  // Test alert functionality
  it('shows alert message and clears it after 5 seconds', async () => {
    render(<AdminChat />);
    fireEvent.click(screen.getByText('Show Alert'));
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    await screen.findByText('Test Alert', {}, { timeout: 6000 }); 
    expect(screen.queryByText('Test Alert')).toBeNull();
  });

  // Test dragging functionality
  it('changes left panel width when dragging divider', () => {
    render(<AdminChat />);
    const divider = screen.getByTestId('divider');
    fireEvent.mouseDown(divider);
    fireEvent.mouseMove(divider, { clientX: 500 }); 
    fireEvent.mouseUp(divider);
    expect(screen.getByTestId('left-panel')).toHaveStyle('width: 40%'); 
  });

  // Test unmount behavior
  it('dispatches RESET_CHAT action when unmounted', () => {
    const mockDispatch = jest.fn();
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      data: { user: { displayName: 'Test User', photoURL: 'test.jpg' } },
      dispatch: mockDispatch,
    }));
    const { unmount } = render(<AdminChat />);
    unmount();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET_CHAT' });
  });

});
