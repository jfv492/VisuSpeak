/*
  In this file we conducted testing for Login Page
  and it's features utlizing the @testing-library/react library
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { render, screen } from '@testing-library/react';
import Login from '../modules/Login';

// Importing Firebase configuration 
import firebaseConfig from '../firebase.js'; 

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Firebase services with initializing
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

describe('Login component', () => {
  // Render the login form
  test('renders login form', () => {
    render(<Login />);
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });


});
