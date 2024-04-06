import React, { useState, useEffect, useContext } from "react";
import { realtimeDb, db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";

import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
// import SettingsUserInfo from "../account_setting/UserInfo.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useTranslation } from "react-i18next";
import LatestFeedback from "./LatestFeedback.js";

import UserCard from "./UserCard";

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
  const [hoveredUser, setHoveredUser] = useState(null);
  let lastActiveTime;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const statusRef = ref(realtimeDb, "/status");
    const unsubscribe = onValue(statusRef, async (snapshot) => {
      const statuses = snapshot.val();
      const onlineUsers = [];

      for (let userId in statuses) {
        if (statuses[userId].state === "online") {
          onlineUsers.push(userId);
          lastActiveTime = statuses[userId].last_changed;
        }
      }

      const fetchedUsers = await Promise.all(
        onlineUsers.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const lastChangedTimestamp = statuses[userId]?.last_changed || null;

            return {
              uid: userId,
              ...userData,
              lastChanged: lastChangedTimestamp
                ? new Date(lastChangedTimestamp)
                : null,
            };
          } else {
            return null;
          }
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
  admin && admin.displayName && admin.displayName.toLowerCase().includes(searchTerm.toLowerCase())
);
const filteredGuests = guests.filter((guest) =>
  guest && guest.displayName && guest.displayName.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container rounded-4 dashboard my-4">
      {!mobileView ? (
        <div class="row mt-4 dashboard-row">
          <div class="col-sm-8 dashboard-col">
            <div class="dashboard-header text-start p-3 rounded-3">
              <h1 class="greeting">Hi, {localStorage.getItem("username")}</h1>
              <div className="date-styling">{formatDate()}</div>
            </div>
            <div className={`row dashboard-row mt-4`}>
              <div class="col-sm-6 dashboard-col">
                <div class="overview-box bg-light rounded-3">
                  <h3>{t("AdminUsers")}</h3>
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
              <div class="col-sm-6 dashboard-col">
                <div class="overview-box bg-light rounded-3">
                  <h3>{t("GuestUsers")}</h3>
                  <ul class="list-unstyled user-list">
                    {filteredGuests.map((user) => (
                      <li
                        key={user.uid}
                        class="user-item py-2"
                        onMouseEnter={() => setHoveredUser(user)}
                        onMouseLeave={() => setHoveredUser(null)}
                      >
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
                        {hoveredUser === user && (
                          <UserCard
                            user={user}
                            lastChanged={hoveredUser.lastChanged}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4 dashboard-col">
            <div class="feedback-box bg-light rounded-3">
              <h3>Recent Feedback</h3>
              <LatestFeedback
                organization={localStorage.getItem("organizationName")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="col mobile-dashboard">
          <div class="dashboard-header text-start p-3 rounded-3 mb-3">
            <h1 class="greeting">Hi, {localStorage.getItem("username")}</h1>
            <div className="date-styling">{formatDate()}</div>
          </div>

          <div class="overview-box bg-light rounded-3 mb-3">
            <h3>{t("AdminUsers")}</h3>
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

          <div class="overview-box bg-light rounded-3 mb-3">
            <h3>{t("GuestUsers")}</h3>
            <ul class="list-unstyled user-list">
              {filteredGuests.map((user) => (
                <li
                  key={user.uid}
                  class="user-item py-2"
                  onMouseEnter={() => setHoveredUser(user)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
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
                  {hoveredUser === user && (
                    <UserCard
                      user={user}
                      lastChanged={hoveredUser.lastChanged}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div class="feedback-box bg-light rounded-3">
            <h3>Recent Feedback</h3>
            <LatestFeedback
              organization={localStorage.getItem("organizationName")}
            />
          </div>
        </div>
      )}
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
  );
};

export default Dashboard;
