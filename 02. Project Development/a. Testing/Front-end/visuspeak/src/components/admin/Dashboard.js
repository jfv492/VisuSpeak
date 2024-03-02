import React from "react";

const Dashboard = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Revenue</h5>
              <p class="card-text">$216K</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Monthly Revenue</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
