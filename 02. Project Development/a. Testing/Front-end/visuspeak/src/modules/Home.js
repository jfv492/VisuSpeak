import React from "react";
import HomeNavigation from "../components/landing_page/LandingPage.js";
import HomeMenu from "../components/landing_page/LoggedInHome.js";
import Please from "../assets/images/Please.jpg";

export default function Home() {
  return (
    <div className="background-container">
      {localStorage.getItem("username") == null ? (
      <div className="hero text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">

          <HomeNavigation />

      </div>) : (
          <HomeMenu />
        )}
    </div>
    // <>
    //   <div class="hero-section text-center">
    //     <HomeNavigation />
    //     <button class="btn btn-light">Sign up with email</button>
    //     <button class="btn btn-danger">Sign up with Google</button>
    //     <button class="btn btn-dark">Sign up with Github</button>

    //     <div class="card-container">
    //       <div class="container">
    //         <div class="row">
    //           <div class="col-md-4">
    //             <div class="card">
    //               <img
    //                 class="card-img-top"
    //                 src="path-to-your-image.jpg"
    //                 alt="Card image cap"
    //               />
    //               <div class="card-body">
    //                 <h5 class="card-title">Paperspace H100s</h5>
    //                 <p class="card-text">
    //                   NVIDIA H100 GPUs are now available via Paperspace by
    //                   DigitalOcean.
    //                 </p>
    //                 <a href="#" class="btn btn-primary">
    //                   Get started now
    //                 </a>
    //               </div>
    //             </div>
    //           </div>

    //           <div class="col-md-4">
    //             <div class="card">
    //               <img
    //                 class="card-img-top"
    //                 src="path-to-your-image.jpg"
    //                 alt="Card image cap"
    //               />
    //               <div class="card-body">
    //                 <h5 class="card-title">Paperspace H100s</h5>
    //                 <p class="card-text">
    //                   NVIDIA H100 GPUs are now available via Paperspace by
    //                   DigitalOcean.
    //                 </p>
    //                 <a href="#" class="btn btn-primary">
    //                   Get started now
    //                 </a>
    //               </div>
    //             </div>
    //           </div>

    //           <div class="col-md-4">
    //             <div class="card">
    //               <img
    //                 class="card-img-top"
    //                 src="path-to-your-image.jpg"
    //                 alt="Card image cap"
    //               />
    //               <div class="card-body">
    //                 <h5 class="card-title">Paperspace H100s</h5>
    //                 <p class="card-text">
    //                   NVIDIA H100 GPUs are now available via Paperspace by
    //                   DigitalOcean.
    //                 </p>
    //                 <a href="#" class="btn btn-primary">
    //                   Get started now
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
