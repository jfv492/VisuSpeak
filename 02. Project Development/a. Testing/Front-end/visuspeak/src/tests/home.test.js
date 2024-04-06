/*
  In this file we conducted testing for Home Page
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js'; 
import Home from '../modules/Home';


describe('Home component', () => {
  it('renders the Dashboard component for admin users', () => {
    // Simulate being logged in as an admin
    localStorage.setItem("accountType", "admin");

    render(
      <Router>
        <Home />
      </Router>
    );

    // Checking if the Dashboard component is rendered
    expect(screen.getByText('DashboardContent')).toBeInTheDocument();

    // Cleaning up after the test
    localStorage.removeItem("accountType");
  });
});
