import React from 'react';
import { auth } from '../firebase.js';
import { signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AnonymousLogin = (props) => {
  let navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      // If you need to do anything immediately after signing in, you can do it here.
      // For example, initializing user presence:
      // initializeUserPresence(auth.currentUser.uid);

      props.showAlert('Logged in as an anonymous user', 'success');
      navigate('/chat'); // Navigate to the chat page or wherever you want the user to go.
    } catch (error) {
      console.error('Error with anonymous authentication', error);
      props.showAlert('Failed to log in anonymously. Please try again', 'danger');
    }
  };

  return (
    <div>
      <button onClick={handleAnonymousLogin}>Start Chat as Guest</button>
    </div>
  );
};

export default AnonymousLogin;
