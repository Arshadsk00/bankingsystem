import {
  FiBell,
  FiSearch,
  FiLogOut,
  FiHelpCircle
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("loggedInUser");

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
  // DATE
  // ==========================================

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );


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


  // ==========================================
  // UI
  // ==========================================

  return (

    <header className="header">

      {/* LEFT */}

      <div className="header-left">

        <div className="logo">
          🏦
        </div>

        <div className="bank-name">

          <h2>
            SAFE BANK
          </h2>

          <p>
            Secure Digital Banking
          </p>

        </div>

      </div>


      {/* SEARCH */}

      <div className="search-box">

        <FiSearch
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search services..."
        />

      </div>


      {/* RIGHT */}

      <div className="header-right">

        <span className="date">
          {today}
        </span>


        {/* NOTIFICATION */}

        <button
          className="icon-btn"
          type="button"
        >

          <FiBell />

          <span className="badge">
            2
          </span>

        </button>


        {/* HELP */}

        <button
          className="icon-btn"
          type="button"
        >

          <FiHelpCircle />

        </button>


        {/* PROFILE */}

        <div className="profile">

          <div>

            <h4>
              {user?.fullName ||
                "Customer"}
            </h4>

            <span>
              {user?.accountType ||
                "SAFE BANK Customer"}
            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          className="logout"
          onClick={logout}
          type="button"
        >

          <FiLogOut />

        </button>

      </div>

    </header>

  );
}

export default Header;