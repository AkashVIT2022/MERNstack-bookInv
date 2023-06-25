import React from "react";

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="card">
        <div>
          <i class="fa-solid fa-bell"></i> <br />
          Alerts and <br /> Notifications
        </div>
      </div>
      <div className="card">
        <div>
          <i class="fa-solid fa-layer-group"></i> <br />
          Stock <br /> Overview
        </div>
      </div>
      <div className="card">
        <div>
          <i class="fa-solid fa-square-poll-vertical"></i> <br />
          Sales <br /> Summary
        </div>
      </div>

     <div id="card1">
     <div className="card1">
        content
      </div>
      <div className="card1">
      content 
      </div>
      <div className="card1">
      content
      </div>
     </div>
    </div>
  );
};

export default Navbar;
