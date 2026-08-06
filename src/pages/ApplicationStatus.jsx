import { useState } from "react";
import "../css/ApplicationStatus.css";

function ApplicationStatus() {

  const [mobile, setMobile] = useState("");
  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");

  const checkStatus = () => {

    if (mobile.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      setApplication(null);
      return;
    }

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const found = applications.find(
      (app) => app.mobile === mobile
    );

    if (found) {
      setApplication(found);
      setError("");
    } else {
      setApplication(null);
      setError("No application found.");
    }

  };

  return (
    <div className="status-page">

    <div className="status-container">

      <h1>Application Status</h1>

      <p>
        Enter your registered mobile number
      </p>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        maxLength={10}
        onChange={(e) =>
          setMobile(
            e.target.value.replace(/\D/g, "")
          )
        }
      />

      <button onClick={checkStatus}>
        Check Status
      </button>

      {error && (
        <p className="error">{error}</p>
      )}

      {application && (

        <div className="status-card">

          <h2>{application.fullName}</h2>

          <p>
            <strong>Application ID :</strong>
            {" "}
            {application.id}
          </p>

          <p>
            <strong>Account Type :</strong>
            {" "}
            {application.accountType}
          </p>

          <p>
            <strong>Deposit :</strong>
            {" "}
            ${application.deposit}
          </p>

          <p>
            <strong>Submitted :</strong>
            {" "}
            {application.submittedOn || "Today"}
          </p>

          <h3
            className={
              application.status.toLowerCase()
            }
          >
            {application.status}
          </h3>

        </div>

      )}

    </div>
      </div>
  );

}

export default ApplicationStatus;