import React from "react";
import { useNavigate} from "react-router-dom";
const Navbar = () => {
  let navigate=useNavigate();
  return (
    <div id="navbar">
      <div className="card" onClick={()=>navigate('/alert')}>
        <div>
          <i className="fa-solid fa-bell"></i> <br />
          <a className="card1" rel="noopener noreferrer">
            Alert
          </a>
        </div>
      </div>
      <div className="card" onClick={()=>navigate('/inventory')}>
        <div>
          <i className="fa-solid fa-layer-group"></i> <br />
          <a className="card1">
            Overview
          </a>
        </div>
      </div>
      <div className="card" onClick={()=>navigate('/admin_summary')}>
        <div>
          <i className="fa-solid fa-square-poll-vertical"></i> <br />
          <a className="card1">
            Summary
          </a>
        </div>
      </div>

      <div id="card1">

        <div className="card2">
          Shows Alerts and Notifications of the stocks and products
        </div>
        <div className="card2">
          Provides an overview on the status of the products.
        </div>
        <div className="card2">
          Shows the summary
        </div>
      </div>

    </div>
  );
};

export default Navbar;
