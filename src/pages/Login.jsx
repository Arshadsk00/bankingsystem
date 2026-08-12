import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================

  const sendOtp = async () => {

    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8082/auth/send-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(
          data.message || "Failed to send OTP"
        );

        return;
      }

      if (
        data.message !==
        "OTP sent successfully"
      ) {

        setError(
          data.message || "Failed to send OTP"
        );

        return;
      }

      setShowOtp(true);

      alert(
        "OTP sent successfully to your email"
      );

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // VERIFY OTP + JWT LOGIN
  // =========================

  const verifyOtp = async () => {

    setError("");

    if (!otp || otp.length !== 6) {

      setError(
        "Enter the 6 digit OTP"
      );

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8082/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            otp: otp
          })
        }
      );

      const data = await response.json();

      console.log(
        "Login Response:",
        data
      );


      // =========================
      // CHECK HTTP RESPONSE
      // =========================

      if (!response.ok) {

        setError(
          data.message ||
          "OTP verification failed"
        );

        return;
      }


      // =========================
      // CHECK LOGIN SUCCESS
      // =========================

      if (!data.success) {

        setError(
          data.message ||
          "Invalid OTP"
        );

        return;
      }


      // =========================
      // CHECK JWT
      // =========================

      if (!data.token) {

        setError(
          "Login successful, but JWT token was not received."
        );

        return;
      }


      // =========================
      // SAVE JWT TOKEN
      // =========================

      localStorage.setItem(
        "token",
        data.token
      );


      // =========================
      // SAVE LOGGED-IN USER
      // =========================

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );
      localStorage.setItem(
  "token",
  data.token
);


      console.log(
        "JWT saved successfully"
      );


      alert(
        "Login successful!"
      );


      // =========================
      // GO TO DASHBOARD
      // =========================

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">
          🏦
        </div>


        <h1>
          SAFE BANK
        </h1>


        <p className="login-subtitle">
          Existing Account Login
        </p>


        <form
          onSubmit={(e) =>
            e.preventDefault()
          }
        >

          {/* EMAIL */}

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={showOtp}
            required
          />


          {/* OTP */}

          {showOtp && (

            <>

              <label>
                Enter OTP
              </label>

              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => {

                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setOtp(value);

                }}
                required
              />

            </>

          )}


          {/* ERROR */}

          {error && (

            <p className="login-error">
              {error}
            </p>

          )}


          {/* BUTTON */}

          {!showOtp ? (

            <button
              type="submit"
              className="login-btn"
              onClick={sendOtp}
              disabled={loading}
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>

          ) : (

            <button
              type="submit"
              className="login-btn"
              onClick={verifyOtp}
              disabled={loading}
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

          )}

        </form>


        {/* BACK */}

        <button
          className="back-login"
          onClick={() =>
            navigate("/")
          }
        >
          ← Back to Home
        </button>

      </div>

    </div>

  );

}

export default Login;