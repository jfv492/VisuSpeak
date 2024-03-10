// import React from "react";
// import HomeNavigation from "../components/landing_page/LandingPage.js";
// import HomeMenu from "../components/landing_page/LoggedInHome.js";
// import Please from "../assets/images/Please.jpg";
// import CustomerSignin from "../components/customer/CustomerSignin.js";
// import Dashboard from "../components/admin/Dashboard.js";
// import "../App.css";

// export default function Home() {
//   return (
//     // <div className="background-container">
//     //   {localStorage.getItem("username") == null ? (
//     //   <div className="hero text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">

//     //       <HomeNavigation />

//     //   </div>) : (
//     //       <HomeMenu />
//     //     )}
//     // </div>

//     <div class="hero-section">
//       <div class="row align-items-center mx-3">
//         {localStorage.getItem("accountType") !== "admin" ? (
//           <div class="col-sm-12 text-begin landing-page rounded-4 shadow-lg">
//             <div className="d-flex justify-content-between align-items-start">
//               <h1 class="text-white">Welcome to VisuSpeak</h1>
//               <i
//                 class="fa-solid fa-question help-icon"
//                 style={{ color: "#ffffff" }}
//               ></i>
//             </div>
//             <p class="lead text-white">Your ASL Companion</p>

//             <CustomerSignin />
//           </div>
//         ) : (
//           <Dashboard />
//         )}
//       </div>
//       <div id="content"></div>
//     </div>
//   );
// }

// import React from 'react';
// import CustomerSignin from '../components/customer/CustomerSignin.js';
// import Dashboard from '../components/admin/Dashboard.js';
// import "../App.css";

// import icon1 from '../assets/icons/Oneonone.png';
// import icon2 from '../assets/icons/Quick.png';
// import icon3 from '../assets/icons/Efficient.png';
// import icon4 from '../assets/icons/Reliable.png';

// export default function Home() {
//   return (
//     <div className="visuspeak-container">
//       {localStorage.getItem("accountType") !== "admin" ? (
//         <div className={`visuspeak-welcome-section`}> {/* Bootstrap p-2 class for padding */}
//           <div className="date-weather-header">
//             {/* Your date and weather components */}
//           </div>
//           <h1>Welcome to VisuSpeak's</h1>
//           <h1>Customer Service Support</h1>
//           <p className="asl-user-query">Are you an ASL User?</p>
//           <p>Connect with an Administrator by clicking the button below</p>
//           <CustomerSignin />
//           <div className="service-highlight">
//             <hr className="highlight-line" />
//             <img src={icon1} alt="One-on-One" className="highlight-icon"/>
//             <div className="highlight-text">
//               One-on-One Conversation
//               <div className="subtext">with our Admins</div>
//             </div>
//           </div>
//           <div className="service-info-section">
//             <div className="service-info-item">
//               <img src={icon2} alt="Quick" />
//               <span>Quick</span>
//             </div>
//             <div className="service-info-item">
//               <img src={icon3} alt="Efficient" />
//               <span>Efficient</span>
//             </div>
//             <div className="service-info-item">
//               <img src={icon4} alt="Reliable" />
//               <span>Reliable</span>
//             </div>
//           </div>
//           <div className="communication-footer">
//             Communicate Effortlessly with our all new ASL Support
//           </div>
//         </div>
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }

import React from 'react';
import CustomerSignin from '../components/customer/CustomerSignin.js';
import Dashboard from '../components/admin/Dashboard.js';
import "../App.css";
import icon1 from '../assets/icons/Oneonone.png';
import icon2 from '../assets/icons/Quick.png';
import icon3 from '../assets/icons/Efficient.png';
import icon4 from '../assets/icons/Reliable.png';

export default function Home() {
  return (
    <div>
      {localStorage.getItem("accountType") !== "admin" ? (
        <>
          <div className="visuspeak-hero">
            <h1>Welcome to VisuSpeak Support</h1>
            <p className="asl-user-query">Looking to chat in ASL?</p>
            <p className ="connect-admin">Connect with our Administrators by clicking the button below</p>
            <CustomerSignin />
          </div>
          <div className="content-container">
            <div className="service-info-section">
              <div className="card service-card">
                <img src={icon1} className="card-img-top" alt="One-on-One" />
                <div className="card-body">
                  <p className="card-text">One-on-One Conversations</p>
                </div>
              </div>
              <div className="card service-card">
                <img src={icon2} className="card-img-top" alt="Quick" />
                <div className="card-body">
                  <p className="card-text">Quick service for your needs</p>
                </div>
              </div>
              <div className="card service-card">
                <img src={icon3} className="card-img-top" alt="Efficient" />
                <div className="card-body">
                  <p className="card-text">Efficient solutions</p>
                </div>
              </div>
              <div className="card service-card">
                <img src={icon4} className="card-img-top" alt="Reliable" />
                <div className="card-body">
                  <p className="card-text">Safe and Reliable</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
