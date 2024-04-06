/*
  In this file we conducted testing for Account Settings
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountSettings from '../modules/AccountSettings';

// Mock UserInfo and EditPassword components for firebase authentication
jest.mock('../components/account_setting/UserInfo.js', () => () => <div>User Info Component</div>);
jest.mock('../components/account_setting/EditPassword.js', () => () => <div>Edit Password Component</div>);

describe('AccountSettings Component', () => {
  test('rendering UserInfo component', () => {
    //Rendering Account Settings component for UserInfo
    const { getByText } = render(
      <MemoryRouter>
        <AccountSettings />
      </MemoryRouter>
    );
    expect(getByText('User Info Component')).toBeInTheDocument();
  });

  test('rendering EditPassword component', () => {
    //Rendering Account Settings component for EditPassword
    const { getByText } = render(
      <MemoryRouter>
        <AccountSettings />
      </MemoryRouter>
    );
    expect(getByText('Edit Password Component')).toBeInTheDocument();
  });

});
