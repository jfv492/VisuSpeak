import React, { useState, useEffect } from 'react';
import { realtimeDb, db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const statusRef = ref(realtimeDb, '/status');

    const unsubscribe = onValue(statusRef, async (snapshot) => {
      const statuses = snapshot.val();
      const onlineUsers = [];

      for (let userId in statuses) {
        if (statuses[userId].state === 'online') {
          onlineUsers.push(userId);
        }
      }

      const fetchedUsers = await Promise.all(
        onlineUsers.map(async (userId) => {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          return userDocSnap.exists() ? { uid: userId, ...userDocSnap.data() } : null;
        })
      );

      const adminsList = fetchedUsers.filter(user => user?.type === 'admin');
      const guestsList = fetchedUsers.filter(user => user?.type !== 'admin');

      setAdmins(adminsList);
      setGuests(guestsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Column for Admin Users */}
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Users</h5>
              <ul>
                {admins.map((user) => (
                  <li key={user.uid}>{user.displayName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Column for Guest Users */}
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Guest Users</h5>
              <ul>
                {guests.map((user) => (
                  <li key={user.uid}>{user.displayName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;