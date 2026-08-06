import { useNavigate } from "react-router-dom";
import "../css/Success.css";

function Success() {

  const navigate = useNavigate();

  return (

    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Application Submitted!</h1>

        <h3>Your bank account application has been submitted successfully.</h3>

        <div className="status">
          🟡 Pending Verification
        </div>

        <div className="application-box">
          <h4>Application Number</h4>
          <p>APP-{Date.now()}</p>
        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

      </div>

    </div>

  );

}

export default Success;