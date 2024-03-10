import React, { useState, useEffect } from "react";
import { realtimeDb, db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";

import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import SettingsUserInfo from "../account_setting/UserInfo.js"

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

      const adminsList = fetchedUsers.filter(
        (user) => user?.type === 'admin' && user?.displayName !== localStorage.getItem('username')
      );
      const guestsList = fetchedUsers.filter((user) => user?.type !== 'admin');

      setAdmins(adminsList);
      setGuests(guestsList);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter admins and guests based on search term
  const filteredAdmins = admins.filter((admin) =>
    admin.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredGuests = guests.filter((guest) =>
    guest.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <SettingsUserInfo />

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row my-4">
        {/* Admin Users */}
        <div className="col-md-6">
          <h2>Admin Users</h2>
          <div className="d-flex flex-wrap justify-content-left">
            {filteredAdmins.map((user) => (
              <div key={user.uid} className="text-center m-3">
                <img
                  src={user.photoURL || defaultProfilePicture}
                  alt="Admin"
                  className="rounded-circle mb-2"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p>{user.displayName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Users */}
        <div className="col-md-6">
          <h2>Guest Users</h2>
          <div className="d-flex flex-wrap justify-content-left">
            {filteredGuests.map((user) => (
              <div key={user.uid} className="text-center m-3">
                <img
                  src={user.photoURL || defaultProfilePicture}
                  alt="Guest"
                  className="rounded-circle mb-2"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p>{user.displayName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;