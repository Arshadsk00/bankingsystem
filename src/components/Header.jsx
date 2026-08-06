
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiSearch,
  FiLogOut,
  FiHelpCircle
} from "react-icons/fi";
import { useEffect, useState } from "react";

import "./Header.css";

function Header() {
  const [user, setUser] = useState(null);

useEffect(() => {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    setUser(loggedInUser);
  }

}, []);

  const today = new Date().toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
  });
  const navigate=useNavigate();

   

  return (

    <header className="header">

      {/* Left */}

      <div className="header-left">

        <div className="logo">
          🏦
        </div>

        <div className="bank-name">

          <h2>SAFE BANK</h2>

          <p>Secure Digital Banking</p>

        </div>

      </div>

      {/* Search */}

      <div className="search-box">

        <FiSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search services..."
        />

      </div>

      {/* Right */}

      <div className="header-right">

        <span className="date">

          {today}

        </span>

        <button className="icon-btn">

          <FiBell/>

          <span className="badge">
            2
          </span>

        </button>

        <button className="icon-btn">

          <FiHelpCircle/>

        </button>

        <div className="profile">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt=""
          />

          <div>
            <h4>{user?.fullName || "Customer"}</h4>

          <span>{user?.accountType || "SAFE BANK Customer"}</span>

            

          </div>

        </div>

        <button className="logout"
        onClick={()=>navigate("/login")}>

          <FiLogOut/>

        </button>

      </div>

    </header>

  );

}

export default Header;