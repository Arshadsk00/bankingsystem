import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {

  const navigate = useNavigate();

  return (

    <div className="welcome-page">

      <div className="welcome-card">

        {/* Left Side */}

        <div className="welcome-left">

          <div className="logo-circle">
            🏦
          </div>

          <h1>SAFE BANK</h1>

          <h3>Secure Digital Banking</h3>

          <p>
            Open a savings account in minutes and enjoy secure,
            fast and reliable banking services.
          </p>

          <div className="feature-list">

            <div>✔ Instant Account Opening</div>

            <div>✔ Safe & Secure Transactions</div>

            <div>✔ Debit Card & UPI</div>

            <div>✔ 24×7 Online Banking</div>

          </div>

        </div>

        {/* Right Side */}

        <div className="welcome-right">

          <h2>Welcome</h2>

          <p>
            Choose an option below to continue.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/create-account")}
            
          >
            Create New Account
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Existing Customer
          </button>

          <div className="security-box">

            🔒 RBI Compliant Banking

            <span>
              Your data is protected using bank-level encryption.
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Welcome;