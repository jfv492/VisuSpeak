/*
  In this file we conducted testing for SignUp
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../modules/SignUp.js'; 
import { auth, storage, db } from '../firebase.js'; 

describe('SignUp Component', () => {
   //Testing to see if the signup renders without crashing
 test('renders without crashing', () => {
    render(<SignUp />);
 });

 // Test if the form data updates 
 test('updates form data on input change', async () => {
    const { getByLabelText } = render(<SignUp />);
    const input = getByLabelText('First Name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
 });

 //Testing Form Validation 
 test('validates form fields', async () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const submitButton = getByText('Sign Up');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(getByText('FieldBlank')).toBeInTheDocument();
    });
 });

 // Testing Submission Handling
 test('handles form submission', async () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.click(getByText('Sign Up'));
    await waitFor(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(db.setDoc).toHaveBeenCalled();
    });
 });
});
