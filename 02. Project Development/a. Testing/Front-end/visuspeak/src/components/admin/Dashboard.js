import React, { useState, useEffect, useContext } from "react";
import { realtimeDb, db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";

import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import SettingsUserInfo from "../account_setting/UserInfo.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useTranslation } from "react-i18next";

const formatDate = () => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date();
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const restOfDate = date.toLocaleDateString("en-US", options);

  return (
    <span>
      <strong>{weekday}</strong>, {restOfDate}
    </span>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <>
      <div class="container">
        <div class="dashboard-header text-start mt-4 mb-3">
          <h1 class="greeting">Hi, {localStorage.getItem("username")}</h1>
          <div className="date-styling">{formatDate()}</div>
        </div>

        <div class="row mb-4">
          <div class="col-sm-4">
            <div class="overview-box bg-light">
              <h2>{t("AdminUsers")}</h2>
              <ul class="list-unstyled">
                {filteredAdmins.map((user) => (
                  <li key={user.uid} class="user-item py-2">
                    <div class="d-flex media align-items-center">
                      <img
                        src={user.photoURL || defaultProfilePicture}
                        alt="Admin"
                        className="rounded-circle me-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div class="media-body">
                        <h5 class="mt-0 mb-1">{user.displayName}</h5>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="overview-box bg-light">
              <h2>{t("GuestUsers")}</h2>
              <ul class="list-unstyled">
                {filteredGuests.map((user) => (
                  <li key={user.uid} class="user-item py-2">
                    <div class="d-flex media align-items-center">
                      <img
                        src={user.photoURL || defaultProfilePicture}
                        alt="Admin"
                        className="rounded-circle me-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div class="media-body">
                        <h5 class="mt-0 mb-1">{user.displayName}</h5>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="overview-box bg-light">
              <h2>Recent Feedback</h2>
              <p>Unique Views</p>
            </div>
          </div>
        </div>

        {/* <div class="slide-preview bg-light">
          <h4>Next in Fashion</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>10 Slides</p>
        </div>

        <div class="slide-preview bg-light">
          <h4>Digital Marketing Today</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>10 Slides</p>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
