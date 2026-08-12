import {
  useState,
  useEffect
} from "react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  FiHome,
  FiUserPlus,
  FiClipboard,
  FiLogOut,
  FiSettings,
  FiUser,
  FiPhone
} from "react-icons/fi";

import "../css/Sidebar.css";
import { useTranslation } from "react-i18next";


function Sidebar() {
    const {t} = useTranslation();

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);


  // ==========================================
  // CLOSE SIDEBAR
  // ==========================================

  const closeSidebar = () => {
    setOpen(false);
  };


  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "loggedInUser"
      );


    if (
      !storedUser ||
      storedUser === "undefined" ||
      storedUser === "null"
    ) {

      setUser(null);

      return;
    }


    try {

      const loggedUser =
        JSON.parse(storedUser);

      setUser(loggedUser);

    } catch (error) {

      console.error(
        "Invalid loggedInUser:",
        error
      );

      localStorage.removeItem(
        "loggedInUser"
      );

      setUser(null);
    }

  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  const getInitials = (name) => {
  if (!name) return "C";

  const parts = name.trim().split(/\s+/);

  if (parts.length >= 2) {
    return (
      parts[0].charAt(0) +
      parts[1].charAt(0)
    ).toUpperCase();
  }

  return parts[0].charAt(0).toUpperCase();
};


  // ==========================================
  // UI
  // ==========================================

  return (

    <>

      {/* MOBILE MENU BUTTON */}

      <button
        className="menu-toggle"
        onClick={() =>
          setOpen(true)
        }
      >
        ☰
      </button>


      {/* OVERLAY */}

      {open && (

        <div
          className="overlay"
          onClick={closeSidebar}
        />

      )}


      {/* SIDEBAR */}

      <aside
        className={
          open
            ? "sidebar active"
            : "sidebar"
        }
      >


        {/* =====================================
            TOP
        ===================================== */}

        <div className="sidebar-top">

          <div className="sidebar-logo">

            <div className="logo-circle">
              🏦
            </div>

            <div>

              <h2>
                SAFE BANK
              </h2>

              <p>
                Digital Banking
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            MENU
        ===================================== */}

        <nav className="sidebar-menu">


          <NavLink
            to="/dashboard"
            className="menu-item"
            onClick={closeSidebar}
          >

            <FiHome />

            <span>
              {t("Dashboard")}
              
            </span>

          </NavLink>


          <NavLink
            to="/create-account"
            className="menu-item"
            onClick={closeSidebar}
          >

            <FiUserPlus />

            <span>
              {t("Create Account")}
              
            </span>

          </NavLink>


          <NavLink
            to="/application-status"
            className="menu-item"
            onClick={closeSidebar}
          >

            <FiClipboard />

            <span>
              {t("Application Status")}
              
            </span>

          </NavLink>


          <NavLink
            to="/profile"
            className="menu-item"
            onClick={closeSidebar}
          >

            <FiUser />

            <span>
              My Profile
            </span>

          </NavLink>


          <NavLink
            to="/settings"
            className="menu-item"
            onClick={closeSidebar}
          >

            <FiSettings />

            <span>
              Settings
            </span>

          </NavLink>


          {/* CONTACT */}

          <button
            className="contact-btn"
            onClick={() => {

              closeSidebar();

              navigate("/contact");

            }}
          >

            <FiPhone />

            <span>
              Contact Us
            </span>

          </button>


        </nav>


        {/* =====================================
            BOTTOM
        ===================================== */}

        <div className="sidebar-bottom">

    <div className="user-card">

        <div className="profile-avatar">
            {user?.fullName
                ? user.fullName
                    .split(" ")
                    .map(name => name.charAt(0))
                    .join("")
                    .slice(0, 2)
                : "C"
            }
        </div>

        <div className="user-card-details">

            <h3>
                {user?.fullName || "Customer"}
            </h3>

            <p>
                {user?.accountType || "SAFE BANK Customer"}
            </p>

        </div>

    </div>


    <button
        className="logout-btn"
        onClick={logout}
    >

        <FiLogOut />

        <span>
            Logout
        </span>

    </button>

</div>

       

      </aside>

    </>

  );
}

export default Sidebar;