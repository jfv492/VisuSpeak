// import React from "react";
// import { Link } from 'react-router-dom';
// import ASLDictionaryCard from "../components/resources_page/ASLDictionaryCard.js";
// import BookInterpreter from "../components/resources_page/BookInterpreter.js";
// import ASLEducation from "../components/resources_page/ASLEducation.js";
// import ASLClasses from "../components/resources_page/ASLClasses.js";
// import ASLHistory from "../components/resources_page/ASLHistory.js";
// import ASLNews from "../components/resources_page/ASLNews.js";

// import ResourceImage1 from "../assets/images/Hello.jpg";
// import ResourceImage2 from "../assets/images/No.jpg"; 

// export default function Resources() {
//   return (
//     <div>
//       <div className="hero container resources-section shadow-lg rounded-4 p-5 mt-5">
//         <h1 className="display-3 fw-bold mb-4">Resources</h1>
        
//         {/* First row with two columns */}
//         <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
//           <ASLDictionaryCard />
//           <BookInterpreter />
//         </div>
        
//         {/* Second row with four columns */}
//         <div className="row row-cols-1 row-cols-md-4 g-4">
//           <ASLEducation />
//           <ASLClasses />
//           <ASLHistory />
//           <ASLNews />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from 'react-router-dom';

import ResourceImage1 from "../assets/images/Dictionary.png";
import ResourceImage2 from "../assets/images/ASLClasses.png";
import ResourceImage3 from "../assets/images/ASLNews.png"; 

export default function Resources() {
  return (
    <div className="container my-5">
      <h1 className="">Resources</h1>
      
      {/* First Section with Image on the left */}
      <div className="row about-us-sections align-items-center">
        <div className="col-sm-4">
          <img
            src={ResourceImage1}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">ASL Dictonary</h3>
          <p>Our ASL Dictionary offers a curated selection of words supported by our application, available through an easy-to-use dropdown menu. Each entry is paired with a clear demonstration video, providing a visual guide to master the signs. This feature is designed to help users quickly learn and accurately replicate ASL signs, 
            enhancing their ability to communicate effectively with the ASL community.</p>
          <Link to="/asldictionary" className="btn btn-primary resources-buttons" role="button">
            View Dictionary
          </Link>
        </div>
      </div>
      <hr />
      
      {/* Second Section with Image on the right */}
      <div className="row about-us-sections align-items-center row-reverse rounded-4">
        <div className="col-sm-4 ">
          <img
            src={ResourceImage2}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead order-sm-1">
          <h3 className="about-us-headers border-bottom pb-2 ">Learn ASL Professionally</h3>
          <p>Elevate your American Sign Language skills with Saskatechwan Deaf and Hard of Hearing Services. Designed for immersive learning, these classes provide structured instruction from experienced sign language educators. Engage in interactive lessons that cover everything from fundamental signs to advanced communication techniques, 
            all aimed at building your proficiency and confidence in ASL.</p>
          <Link to="https://sdhhs.com/2020/12/09/american-sign-language-classes/" className="btn btn-primary resources-buttons" role="button">
            View Resource
          </Link>
        </div>
      </div>
      <hr />

      {/* Repeat for other sections as needed */}
      <div className="row about-us-sections align-items-center">
        <div className="col-sm-4">
          <img
            src={ResourceImage3}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">National Deaf News</h3>
          <p>Stay informed with National Deaf News, your go-to source for the latest happenings in the Deaf community. Our news section brings you up-to-the-minute reports, stories of empowerment, and key updates 
            from Deaf culture and events across the world.</p>
          <Link to="https://cad-asc.ca/" className="btn btn-primary resources-buttons" role="button">
            View Resource
          </Link>
        </div>
      </div>
      
    </div>
  );
}
