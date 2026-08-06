import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

import { signInWithPhoneNumber } from "firebase/auth";



function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");

   useEffect(() => {

    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
        }
      );

    }

  }, []);


    const sendOtp =async () => {

  setError("");

  if (mobile.length !== 10) {
    setError("Enter a valid mobile number");
    return;
  }
const response = await fetch(
  `http://localhost:8082/users/mobile/${mobile}`
);

if (!response.ok) {
  setError("User not found");
  return;
}

const account = await response.json();

if (account.status !== "Approved") {
  setError("Your account is not approved yet.");
  return;
}
 
try {

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          "+91" + mobile,
          appVerifier
        );

      window.confirmationResult = confirmationResult;

      setShowOtp(true);

      alert("OTP Sent Successfully");

    } catch (err) {

      console.log(err);

      setError(err.message);

    }

  };

   const verifyOtp = async () => {

    setError("");

    try {

      await window.confirmationResult.confirm(otp);
const response = await fetch(
  `http://localhost:8082/users/mobile/${mobile}`
);

const account = await response.json();


 

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(account)
  );

  navigate("/dashboard");
 } catch (err) {

      console.log(err);

      setError("Invalid OTP");

    }
  };

 
   return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🏦
        </div>

        <h1>SAFE BANK</h1>

        <p className="login-subtitle">
          Existing Account Login
        </p>

        <form onSubmit={(e)=>e.preventDefault()}>

          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter 10 digit mobile number"
            value={mobile}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setMobile(value);
            }}
            required
          />
          <div id="recaptcha-container"></div>
          {showOtp && (
  <>
    <label>Enter OTP</label>

    <input
      type="text"
      placeholder="Enter 6 digit OTP"
      value={otp}
      maxLength={6}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        setOtp(value);
      }}
      required
    />
  </>
)}
      {error && (
            <p className="login-error">
              {error}
            </p>
          )}

            {!showOtp ? (
  <button
    type="button"
    className="login-btn"
    onClick={sendOtp}
  >
    Send OTP
  </button>
) : (
  <button
    type="button"
    className="login-btn"
    onClick={verifyOtp}
  >
    Verify OTP & Login
  </button>
)}
          
        </form>

        <button
          className="back-login"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

<div className="bank-footer">

  <p>🔒 RBI Compliant Secure Banking</p>

  <p>
    Your data is protected using
    <br />
    256-bit Bank Level Encryption
  </p>

</div>
      </div>

    </div>
  );
}

export default Login;