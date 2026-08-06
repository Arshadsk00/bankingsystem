import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
FiMoon,
FiSun,
FiBell,
FiShield,
FiGlobe,
FiHelpCircle,
FiLogOut,
FiChevronRight,
FiMessageCircle
} from "react-icons/fi";

import "../css/Settings.css";

function Settings() {

const navigate = useNavigate();

const [darkMode,setDarkMode]=useState(
localStorage.getItem("theme")==="dark"
);
const toggleTheme = () => {
  const newTheme = darkMode ? "light" : "dark";

  setDarkMode(!darkMode);

  localStorage.setItem("theme", newTheme);

  document.body.className = newTheme;
};

const [notifications,setNotifications]=useState(true);

useEffect(()=>{

if(darkMode){

document.body.classList.add("dark-theme");

localStorage.setItem("theme","dark");

}else{

document.body.classList.remove("dark-theme");

localStorage.setItem("theme","light");

}

},[darkMode]);

const logout=()=>{

localStorage.removeItem("loggedInUser");

navigate("/login");

};

return(

<div className="settings-page">

<div className="settings-header">

<h1>⚙ Settings</h1>

<p>Manage your SAFE BANK preferences</p>

</div>

<div className="settings-container">

<div className="setting-card">

<div className="left">

<FiMoon className="icon"/>

<div>

<h3>Dark Mode</h3>

<p>Switch between Light and Dark theme</p>

</div>

</div>

<label className="switch">

<input
type="checkbox"
checked={darkMode}
onChange={()=>setDarkMode(!darkMode)}
/>

<span className="slider"></span>

</label>

</div>

<div className="setting-card">

<div className="left">

<FiBell className="icon"/>

<div>

<h3>Notifications</h3>

<p>Receive banking alerts</p>

</div>

</div>

<label className="switch">

<input
type="checkbox"
checked={notifications}
onChange={()=>setNotifications(!notifications)}
/>

<span className="slider"></span>

</label>

</div>

<div
className="setting-card clickable"
onClick={()=>navigate("/profile")}
>

<div className="left">

<FiShield className="icon"/>

<div>

<h3>Security</h3>

<p>Change PIN & Profile</p>

</div>

</div>

<FiChevronRight/>

</div>

<div className="setting-card">

<div className="left">

<FiGlobe className="icon"/>

<div>

<h3>Language</h3>

<p>English</p>

</div>

</div>

<FiChevronRight/>

</div>

<div
className="setting-card clickable"
onClick={()=>navigate("/contact")}
>

<div className="left">

<FiHelpCircle className="icon"/>

<div>

<h3>Contact Support</h3>

<p>Need banking help?</p>

</div>

</div>

<FiChevronRight/>

</div>

<div className="setting-card">

<div className="left">

<FiMessageCircle className="icon"/>

<div>

<h3>SAFE BANK AI</h3>

<p>24×7 Banking Assistant</p>

</div>

</div>

<FiChevronRight/>

</div>

<button
className="logout-btn"
onClick={logout}
>

<FiLogOut/>

Logout

</button>

</div>

</div>

);

}

export default Settings;