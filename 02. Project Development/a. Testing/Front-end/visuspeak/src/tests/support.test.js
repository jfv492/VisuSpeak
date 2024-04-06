/*
  In this file we conducted testing for Support Page
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Support from '../modules/Support'; 

// Mock useTranslation hook from react-i18next
jest.mock('react-i18next', () => ({
 useTranslation: () => ({ t: key => key }),
}));

describe('Support Component', () => {
 it('renders the Support page with translation keys', () => {
    render(
      <MemoryRouter>
        <Support />
      </MemoryRouter>
    );

    // Checking if the translation keys are rendered
    expect(screen.getByText('SupportPage')).toBeInTheDocument();
    expect(screen.getByText('SupportPageDescription')).toBeInTheDocument();
 });

 it('renders the AdminUserSupport, ASLUserSupport, and ASLTranslationOptions components', () => {
    render(
      <MemoryRouter>
        <Support />
      </MemoryRouter>
    );

    // Checking if the components are rendered
    expect(screen.getByText('AdminUserSupport')).toBeInTheDocument();
    expect(screen.getByText('ASLUserSupport')).toBeInTheDocument();
   
 });
});
