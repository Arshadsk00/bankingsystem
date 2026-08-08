import { useState,useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUserPlus,
  FiClipboard,
  FiShield,
  FiLogOut,
  FiSettings,
  FiUser,
  FiPhone
} from "react-icons/fi";

import "../css/Sidebar.css";

function Sidebar() {

  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);
  const navigate=useNavigate();
  const [user, setUser] = useState(null);

useEffect(() => {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    setUser(loggedInUser);
  }

}, []);

  return (
    <>

      <button
        className="menu-toggle"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div
          className="overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={open ? "sidebar active" : "sidebar"}>

        <div className="sidebar-top">

          <div className="sidebar-logo">

            <div className="logo-circle">
              🏦
            </div>

            <div>

              <h2>SAFE BANK</h2>

              <p>Digital Banking</p>

            </div>

          </div>

        </div>

        <nav className="sidebar-menu">

          <NavLink to="/dashboard" className="menu-item">
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/create-account" className="menu-item">
            <FiUserPlus />
            <span>Create Account</span>
          </NavLink>

          <NavLink to="/application-status" className="menu-item">
            <FiClipboard />
            <span>Application Status</span>
          </NavLink>

          <NavLink to="/profile" className="menu-item">
            <FiUser />
            <span>My Profile</span>
          </NavLink>

          {/* <NavLink to="/admin" className="menu-item">
            <FiShield />
            <span>Admin Panel</span>
          </NavLink> */}

          <NavLink to="/settings" className="menu-item">
            <FiSettings />
            <span>Settings</span>
          </NavLink>
          <button className="contact-btn" onClick={() => navigate("/contact")}>
             <FiPhone />
              <span>Contact Us</span>
        </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="user-card">
           
<div className="avatar-circle">
{
user?.fullName
? user.fullName
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0,2)
    .toUpperCase()
: "U"
}
</div>

            {/* <img
              src="https://i.pravatar.cc/80?img=12"
              alt=""
            /> */}

            <div>

              <h3>{user?.fullName}</h3>
              <p>{user?.accountType}</p>
              
            </div>

          </div>

          <button className="logout-btn" onClick={()=>navigate("/login")}>

            <FiLogOut />

            <span>Logout</span>

          </button>

        </div>

      </aside>

    </>
  );
}

export default Sidebar;