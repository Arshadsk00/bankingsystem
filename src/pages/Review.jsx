

import { useLocation, useNavigate } from "react-router-dom";
import "../css/Review.css";

function Review() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const formData = state;
  console.log(formData);

  const handleSubmit = () => {

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

      // Generate Application Number
  const applicationNumber =
    `SB${new Date().getFullYear()}${String(applications.length + 1).padStart(5, "0")}`;

  // Check duplicate Mobile Number
  const mobileExists = applications.some(
    app => app.mobile === formData.mobile
  );

  if (mobileExists) {
    alert("❌ Mobile Number already registered.");
    return;
  }

  // Check duplicate Email
  const emailExists = applications.some(
    app => app.email === formData.email
  );

  if (emailExists) {
    alert("❌ Email already registered.");
    return;
  }

  // Check duplicate Aadhaar
  const aadhaarExists = applications.some(
    app => app.aadhaar === formData.aadhaar
  );

  if (aadhaarExists) {
    alert("❌ Aadhaar Number already registered.");
    return;
  }

  // Check duplicate PAN
  const panExists = applications.some(
    app => app.pan === formData.pan
  );

  if (panExists) {
    alert("❌ PAN Number already registered.");
    return;
  }

  // Save application
  applications.push({
    applicationNumber,
    ...formData,
    status: "Pending",
    submittedOn: new Date().toLocaleDateString(),
  });

  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );

  alert("✅ Application Submitted Successfully!");

  navigate("/success");
};

    

 return (
  <div className="page-content">
  <div className="review-page">

    <div className="review-card">

      <h1 className="review-title">🏦 Review Your Application</h1>

      {/* Personal Details */}
      <div className="review-section">
        <h2>👤 Personal Details</h2>

        <div className="details-grid">

          <div className="detail-box">
            <span>Full Name</span>
            <p>{formData.fullName}</p>
          </div>

          <div className="detail-box">
            <span>Father Name</span>
            <p>{formData.fatherName}</p>
          </div>

          <div className="detail-box">
            <span>Date of Birth</span>
            <p>{formData.dob}</p>
          </div>

          <div className="detail-box">
            <span>Mobile</span>
            <p>{formData.mobile}</p>
          </div>

          <div className="detail-box">
            <span>Email</span>
            <p>{formData.email}</p>
          </div>

          <div className="detail-box">
            <span>Gender</span>
            <p>{formData.gender}</p>
          </div>

        </div>
      </div>

      {/* KYC */}
      <div className="review-section">

        <h2>🪪 KYC Details</h2>

        <div className="details-grid">

          <div className="detail-box">
            <span>Aadhaar</span>
            <p>XXXX XXXX {formData.aadhaar?.slice(-4)}</p>
          </div>

          <div className="detail-box">
            <span>PAN</span>
            <p>{formData.pan}</p>
          </div>

          <div className="detail-box full">
            <span>Address</span>
            <p>{formData.address}</p>
          </div>

        </div>

      </div>

      {/* Account */}
      <div className="review-section">

        <h2>🏦 Account Details</h2>

        <div className="details-grid">

          <div className="detail-box">
            <span>Account Type</span>
            <p>{formData.accountType}</p>
          </div>

          <div className="detail-box">
            <span>Nominee</span>
            <p>{formData.nominee}</p>
          </div>

          <div className="detail-box">
            <span>Initial Deposit</span>
            <p>₹ {formData.deposit}</p>
          </div>

        </div>

      </div>

      <div className="btn-group">

        <button className="edit-btn" onClick={() => navigate(-1)}>
          ✏ Edit
        </button>

        <button className="submit-btn" onClick={handleSubmit}>
          ✔ Confirm & Submit
        </button>

      </div>

    </div>

  </div>
</div>
);
}
export default Review;