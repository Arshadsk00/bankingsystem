import "../css/LeftPanel.css";
import { Navigate, useNavigate } from "react-router-dom";

function LeftPanel() {
    const navigate=useNavigate();
  return (
    <div className="left-panel">

      <div className="bank-logo">
        🏦
      </div>

      <h1>SAFE BANK</h1>

      <h2>Open Your Account Securely</h2>

      <p>
        Join thousands of customers who trust
        SAFE BANK for secure, fast and reliable
        banking services.
      </p>

      <div className="features">

        <div className="feature">
          ✔ Secure Banking
        </div>

        <div className="feature">
          ✔ RBI Guidelines
        </div>

        <div className="feature">
          ✔ Instant Account Opening
        </div>

        <div className="feature">
          ✔ 24×7 Customer Support
        </div>

      </div>

         <button onClick={()=>navigate("/application-status")}>Application Status</button>
    </div>
    
  );
}

export default LeftPanel;