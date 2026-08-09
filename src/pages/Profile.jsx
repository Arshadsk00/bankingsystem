import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiSave,
  FiLogOut,
  FiLock,
  FiPhone,
  FiMail,
  FiMapPin
} from "react-icons/fi";

import "../css/Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Profile fields
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // PIN fields
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // =====================================================
  // LOAD LOGGED-IN USER
  // =====================================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("loggedInUser");

    const token =
      localStorage.getItem("token");

    if (
      !storedUser ||
      storedUser === "undefined" ||
      !token
    ) {

      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("token");

      navigate("/login");

      return;
    }

    try {

      const loggedUser =
        JSON.parse(storedUser);

      if (!loggedUser) {

        navigate("/login");

        return;
      }

      setUser(loggedUser);

      setMobile(
        loggedUser.mobile || ""
      );

      setEmail(
        loggedUser.email || ""
      );

      setAddress(
        loggedUser.address || ""
      );

    } catch (error) {

      console.error(
        "Invalid loggedInUser:",
        error
      );

      localStorage.removeItem(
        "loggedInUser"
      );

      localStorage.removeItem(
        "token"
      );

      navigate("/login");
    }

  }, [navigate]);


  // =====================================================
  // UPDATE PROFILE
  // Mobile + Email + Address
  // =====================================================

  const saveProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert("Session expired. Please login again.");

        navigate("/login");

        return;
      }


      // Basic validation
      if (!mobile || mobile.length !== 10) {

        alert(
          "Mobile number must contain exactly 10 digits."
        );

        return;
      }


      if (!email) {

        alert(
          "Email cannot be empty."
        );

        return;
      }


      // Update database
      const response = await axios.put(

        `http://localhost:8082/users/${user.id}`,

        {
          mobile: mobile,
          email: email,
          address: address
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json"
          }
        }

      );


      // Backend returns updated user
      const updatedUser =
        response.data;


      // Update React state
      setUser(updatedUser);


      // Update localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );


      // Update form values
      setMobile(
        updatedUser.mobile || ""
      );

      setEmail(
        updatedUser.email || ""
      );

      setAddress(
        updatedUser.address || ""
      );


      alert(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );


      if (
        error.response &&
        error.response.status === 403
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem(
          "loggedInUser"
        );

        localStorage.removeItem(
          "token"
        );

        navigate("/login");

        return;
      }


      alert(
        error.response?.data ||
        "Failed to update profile."
      );
    }

  };


  // =====================================================
  // CHANGE PIN
  // =====================================================

  const changePin = async () => {

    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }


      // Current PIN
      if (!currentPin) {

        alert(
          "Enter your current PIN."
        );

        return;
      }


      // New PIN
      if (!newPin) {

        alert(
          "Enter your new PIN."
        );

        return;
      }


      // 4 digit validation
      if (
        !/^\d{4}$/.test(newPin)
      ) {

        alert(
          "PIN must contain exactly 4 digits."
        );

        return;
      }


      // Confirm PIN
      if (
        newPin !== confirmPin
      ) {

        alert(
          "New PIN and Confirm PIN do not match."
        );

        return;
      }


      // =================================================
      // SEND PIN TO BACKEND
      // =================================================

      const response = await axios.put(

        `http://localhost:8082/users/${user.id}/pin`,

        {
          currentPin: currentPin,
          newPin: newPin
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json"

          }
        }

      );


      // Backend returns updated user
      const updatedUser =
        response.data;


      // Update React state
      setUser(updatedUser);


      // Update localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );


      // Clear PIN fields
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");


      alert(
        "PIN Changed Successfully"
      );

    } catch (error) {

      console.error(
        "PIN change error:",
        error
      );


      if (
        error.response &&
        error.response.status === 403
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem(
          "loggedInUser"
        );

        localStorage.removeItem(
          "token"
        );

        navigate("/login");

        return;
      }


      alert(
        error.response?.data ||
        "Failed to change PIN."
      );

    }

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (!user) {

    return (
      <div className="profile-loading">
        Loading...
      </div>
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="profile-page">

      <div className="profile-container">


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="profile-header">

          <div>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your SAFE BANK account details
            </p>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >

            <FiLogOut />

            Logout

          </button>

        </div>


        {/* =========================================
            ACCOUNT INFORMATION
        ========================================= */}

        <div className="profile-card">

          <h2>
            Account Information
          </h2>


          <div className="profile-grid">


            {/* FULL NAME */}

            <div className="profile-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={user.fullName || ""}
                disabled
              />

            </div>


            {/* ACCOUNT NUMBER */}

            <div className="profile-field">

              <label>
                Account Number
              </label>

              <input
                type="text"
                value={
                  user.accountNumber || ""
                }
                disabled
              />

            </div>


            {/* MOBILE */}

            <div className="profile-field">

              <label>
                <FiPhone />
                Mobile Number
              </label>

              <input
                type="text"
                value={mobile}
                maxLength={10}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                <FiMail />
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            {/* ADDRESS */}

            <div className="profile-field full-width">

              <label>
                <FiMapPin />
                Address
              </label>

              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                rows="3"
              />

            </div>


          </div>


          {/* SAVE */}

          <button
            className="save-btn"
            onClick={saveProfile}
          >

            <FiSave />

            Save Changes

          </button>

        </div>


        {/* =========================================
            CHANGE PIN
        ========================================= */}

        <div className="profile-card pin-card">

          <h2>

            <FiLock />

            Change PIN

          </h2>


          <p className="pin-description">

            Change your 4-digit banking PIN.

          </p>


          <div className="profile-grid">


            {/* CURRENT PIN */}

            <div className="profile-field">

              <label>
                Current PIN
              </label>

              <input
                type="password"
                placeholder="Enter current PIN"
                value={currentPin}
                maxLength={4}
                inputMode="numeric"
                onChange={(e) =>
                  setCurrentPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>


            {/* NEW PIN */}

            <div className="profile-field">

              <label>
                New PIN
              </label>

              <input
                type="password"
                placeholder="Enter new PIN"
                value={newPin}
                maxLength={4}
                inputMode="numeric"
                onChange={(e) =>
                  setNewPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>


            {/* CONFIRM PIN */}

            <div className="profile-field">

              <label>
                Confirm New PIN
              </label>

              <input
                type="password"
                placeholder="Confirm new PIN"
                value={confirmPin}
                maxLength={4}
                inputMode="numeric"
                onChange={(e) =>
                  setConfirmPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>


          </div>


          <button
            className="pin-btn"
            onClick={changePin}
          >

            <FiLock />

            Change PIN

          </button>

        </div>


      </div>

    </div>

  );
}

export default Profile;