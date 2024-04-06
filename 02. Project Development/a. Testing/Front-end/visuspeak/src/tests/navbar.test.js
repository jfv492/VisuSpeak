/*
  In this file we conducted testing for NavBar component
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../modules/Navbar';

describe('Navbar component', () => {
  // Rendering the logo and links
  test('renders logo and links correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('VisuSpeak Logo');
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
  });


  test('toggles offcanvas navigation when toggler button is clicked', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const togglerButton = screen.getByLabelText('Toggle navigation');
    userEvent.click(togglerButton);

    const offcanvasNavbar = await screen.findByTestId('offcanvasNavbar');
    expect(offcanvasNavbar).toHaveClass('show');
  });
});
