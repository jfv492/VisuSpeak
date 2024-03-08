import React, { useState, useEffect } from "react";
import { realtimeDb, db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";

import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import SettingsUserInfo from "../account_setting/SettingsUserInfo.js"

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const statusRef = ref(realtimeDb, "/status");

    const unsubscribe = onValue(statusRef, async (snapshot) => {
      const statuses = snapshot.val();
      const onlineUsers = [];

      for (let userId in statuses) {
        if (statuses[userId].state === "online") {
          onlineUsers.push(userId);
        }
      }

      const fetchedUsers = await Promise.all(
        onlineUsers.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
          return userDocSnap.exists()
            ? { uid: userId, ...userDocSnap.data() }
            : null;
        })
      );

      const adminsList = fetchedUsers.filter(
        (user) =>
          user?.type === "admin" &&
          user?.displayName !== localStorage.getItem("username")
      );
      const guestsList = fetchedUsers.filter((user) => user?.type !== "admin");

      setAdmins(adminsList);
      setGuests(guestsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <SettingsUserInfo />
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p>Admin</p>
              <ul>
                {admins.map((user) => (
                  <li key={user.uid}>
                    <div
                      className="me-3"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={user.photoURL || defaultProfilePicture}
                        alt="User"
                        className="rounded-circle shadow me"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                      <i
                        className={`fa-solid fa-circle-check"`}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          color: "#77bb41",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "3px",
                          transform: "translate(30%, 30%)",
                        }}
                      />
                    </div>
                    {user.displayName}
                  </li>
                ))}
              </ul>
              <p>Guests</p>
              <ul>
                {guests.map((user) => (
                  <li key={user.uid}>
                    <div
                      className="me-3"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={user.photoURL || defaultProfilePicture}
                        alt="User"
                        className="rounded-circle shadow me"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                      <i
                        className={`fa-solid fa-circle-check"`}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          color: "#77bb41",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "3px",
                          transform: "translate(30%, 30%)",
                        }}
                      />
                    </div>
                    {user.displayName}
                  </li>
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
