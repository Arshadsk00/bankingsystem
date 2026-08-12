import { useLocation, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiCreditCard,
  FiUsers,
  FiShield,
  FiArrowLeft
} from "react-icons/fi";

import "../css/ViewApplication.css";

function ViewApplication() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const app = state;

  if (!app) {
    return <h2>No Application Found</h2>;
  }

  return (

    <div className="page-content">

      <div className="view-container">

        <div className="view-header">

          <div className="profile">

            <img
              src={`https://ui-avatars.com/api/?name=${app.fullName}&background=1565C0&color=fff&size=120`}
              alt=""
            />

            <div>

              <h1>{app.fullName}</h1>

              <p>Customer Application</p>

            </div>

          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            B
          </button>

        </div>

        <div className="info-grid">

          {/* Personal */}

          <div className="info-card">

            <h2>👤 Personal Details</h2>

            <div className="info-item">
              <FiUser />
              <span>Full Name</span>
              <strong>{app.fullName}</strong>
            </div>

            <div className="info-item">
              <FiUsers />
              <span>Father Name</span>
              <strong>{app.fatherName}</strong>
            </div>

            <div className="info-item">
              <FiCalendar />
              <span>Date of Birth</span>
              <strong>{app.dob}</strong>
            </div>

            <div className="info-item">
              <FiPhone />
              <span>Mobile</span>
              <strong>{app.mobile}</strong>
            </div>

            <div className="info-item">
              <FiMail />
              <span>Email</span>
              <strong>{app.email}</strong>
            </div>

          </div>

          {/* KYC */}

          <div className="info-card">

            <h2>🪪 KYC Details</h2>

            <div className="info-item">
              <FiShield />
              <span>Aadhar</span>
              <strong>{app.aadhar}</strong>
            </div>

            <div className="info-item">
              <FiCreditCard />
              <span>PAN</span>
              <strong>{app.pan}</strong>
            </div>

            <div className="info-item">
              <FiMapPin />
              <span>Address</span>
              <strong>{app.address}</strong>
            </div>

          </div>

          {/* Account */}

          <div className="info-card">

            <h2>🏦 Account Details</h2>

            <div className="info-item">
              <FiCreditCard />
              <span>Account Type</span>
              <strong>{app.accountType}</strong>
            </div>

            <div className="info-item">
              <FiUsers />
              <span>Nominee</span>
              <strong>{app.nominee}</strong>
            </div>

            <div className="info-item">
              <span>💰</span>
              <span>Deposit</span>
              <strong>₹{app.deposit}</strong>
            </div>

            <div className="info-item">
              <span>📄</span>
              <span>Status</span>

              <strong className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ViewApplication;