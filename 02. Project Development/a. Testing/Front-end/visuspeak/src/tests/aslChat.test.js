/*
  In this file we conducted testing for ASL Chat
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ASLChat from '../modules/ASLChat';

describe('ASLChat component', () => {
  test('renders all components correctly', () => {
    // Rendering all the components correctly
    const { getByText } = render(<ASLChat />);
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Chats')).toBeInTheDocument();
    expect(getByText('ChatHeader')).toBeInTheDocument();
    expect(getByText('MessageList')).toBeInTheDocument();
    expect(getByText('InputArea')).toBeInTheDocument();
    expect(getByText('HowToModal')).toBeInTheDocument();
    expect(getByText('AdminList')).toBeInTheDocument();
  });

  //Testing Drag Functionality
  test('dragging functionality works correctly', () => {
    const { getByTestId } = render(<ASLChat />);
    const divider = getByTestId('resizable-divider');

    fireEvent.mouseDown(divider);
    // Simulate Dragging
    fireEvent.mouseMove(window, { clientX: 200 }); 
    fireEvent.mouseUp(window);

    expect(divider).toHaveStyle('left: 200px');
  });

  //Testing popover functionality
  test('popover functionality works correctly', () => {
    const { getByText, getByTestId, queryByText } = render(<ASLChat />);
    const cameraButton = getByText('Camera Button');
    const speedButton = getByText('Speed Button');

    fireEvent.mouseEnter(cameraButton);
    expect(getByTestId('popover-camera-button')).toBeInTheDocument();

    fireEvent.mouseLeave(cameraButton);
    expect(queryByText('Popover Content')).toBeNull();

    fireEvent.mouseEnter(speedButton);
    expect(getByTestId('popover-speed-button')).toBeInTheDocument();

    fireEvent.mouseLeave(speedButton);
    expect(queryByText('Popover Content')).toBeNull();
  });

  //Testing state management updates
  test('state management updates correctly', () => {
    const { getByText } = render(<ASLChat />);
    const button = getByText('Toggle Signing');

    fireEvent.click(button);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
