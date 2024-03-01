import { realtimeDb } from '../firebase';
import { ref, onValue, set, onDisconnect, serverTimestamp } from 'firebase/database';

export const initializeUserPresence = (userId) => {
  const userStatusDatabaseRef = ref(realtimeDb, '/status/' + userId);
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
  };

  // Use the set function here instead of calling set on userStatusDatabaseRef
  set(userStatusDatabaseRef, isOfflineForDatabase);
};

// Function to set user's status to online
export const setUserOnline = (userId) => {
  const userStatusDatabaseRef = ref(realtimeDb, `/status/${userId}`);

  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp(),
  };

  const connectedRef = ref(realtimeDb, '.info/connected');
  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === false) {
      return;
    };

    // Use the onDisconnect() method properly here
    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
      // Use the set function here as well
      set(userStatusDatabaseRef, isOnlineForDatabase);
    });
  });
};

// Function to set user's status to offline
export const setUserOffline = (userId) => {
  const userStatusDatabaseRef = ref(realtimeDb, `/status/${userId}`);
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
  };
  // Use the set function here
  set(userStatusDatabaseRef, isOfflineForDatabase);
};

// Function to get user's status
export const onUserStatusChanged = (userId, callback) => {
  const userStatusDatabaseRef = ref(realtimeDb, `/status/${userId}`);
  onValue(userStatusDatabaseRef, (snapshot) => {
    const status = snapshot.val();
    if (status) {
      callback(status);
    }
  });
};

export const refreshUserOnlineStatus = (userId) => {
    const userStatusDatabaseRef = ref(realtimeDb, `/status/${userId}`);
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: serverTimestamp(),
    };
  
    set(userStatusDatabaseRef, isOnlineForDatabase);
  };
