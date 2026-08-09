import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Review.css";

function Review() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const formData = state;


  // =====================================================
  // SAFETY CHECK
  // =====================================================

  if (!formData) {

    return (

      <div className="review-card">

        <h2>
          No application data found.
        </h2>

        <button
          onClick={() =>
            navigate("/create-account")
          }
        >
          Go to Create Account
        </button>

      </div>

    );
  }


  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  const handleSubmit = async () => {

    try {

      // ================================================
      // BASIC VALIDATION
      // ================================================

      if (
        !formData.fullName ||
        !formData.mobile ||
        !formData.email ||
        !formData.aadhar ||
        !formData.pan ||
        !formData.accountType ||
        !formData.nominee ||
        !formData.deposit ||
        !formData.pin
      ) {

        alert(
          "Please complete all required details."
        );

        return;
      }


      // ================================================
      // PREPARE DATA
      // ================================================

      const userData = {

        fullName:
          formData.fullName,

        fatherName:
          formData.fatherName,

        dob:
          formData.dob,

        mobile:
          formData.mobile,

        email:
          formData.email,

        gender:
          formData.gender,

        aadhar:
          formData.aadhar,

        pan:
          formData.pan,

        address:
          formData.address,

        accountType:
          formData.accountType,

        nominee:
          formData.nominee,

        deposit:
          Number(formData.deposit),

        pin:
          formData.pin

      };


      console.log(
        "Sending application to backend:",
        userData
      );


      // ================================================
      // SEND TO SPRING BOOT
      // ================================================

      const response =
        await axios.post(

          "http://localhost:8082/users",

          userData,

          {
            headers: {
              "Content-Type":
                "application/json"
            }
          }

        );


      // ================================================
      // SUCCESS
      // ================================================

      console.log(
        "Application saved:",
        response.data
      );


      alert(
        "✅ Application Submitted Successfully!"
      );


      // Go to success page

      navigate(
        "/success",
        {
          state: response.data
        }
      );


    } catch (error) {

      console.error(
        "Application submission error:",
        error
      );


      // ================================================
      // BACKEND ERROR
      // ================================================

      if (
        error.response
      ) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Backend response:",
          error.response.data
        );


        alert(
          error.response.data ||
          "Failed to submit application."
        );

      } else {

        alert(
          "Cannot connect to the backend server."
        );

      }

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="review-card">

      <h1 className="review-title">
        🏦 Review Your Application
      </h1>


      {/* =================================================
          PERSONAL DETAILS
      ================================================= */}

      <div className="review-section">

        <h2>
          👤 Personal Details
        </h2>


        <div className="details-grid">

          <div className="detail-box">

            <span>
              Full Name
            </span>

            <p>
              {formData.fullName}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Father Name
            </span>

            <p>
              {formData.fatherName}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Date of Birth
            </span>

            <p>
              {formData.dob}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Mobile
            </span>

            <p>
              {formData.mobile}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Email
            </span>

            <p>
              {formData.email}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Gender
            </span>

            <p>
              {formData.gender}
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          KYC DETAILS
      ================================================= */}

      <div className="review-section">

        <h2>
          🪪 KYC Details
        </h2>


        <div className="details-grid">

          <div className="detail-box">

            <span>
              Aadhar
            </span>

            <p>
              XXXX XXXX{" "}
              {formData.aadhar?.slice(-4)}
            </p>

          </div>


          <div className="detail-box">

            <span>
              PAN
            </span>

            <p>
              {formData.pan}
            </p>

          </div>


          <div className="detail-box full">

            <span>
              Address
            </span>

            <p>
              {formData.address}
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          ACCOUNT DETAILS
      ================================================= */}

      <div className="review-section">

        <h2>
          🏦 Account Details
        </h2>


        <div className="details-grid">

          <div className="detail-box">

            <span>
              Account Type
            </span>

            <p>
              {formData.accountType}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Nominee
            </span>

            <p>
              {formData.nominee}
            </p>

          </div>


          <div className="detail-box">

            <span>
              Initial Deposit
            </span>

            <p>
              ₹ {formData.deposit}
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="btn-group">

        <button
          className="edit-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ✏ Edit
        </button>


        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          ✔ Confirm & Submit
        </button>

      </div>

    </div>

  );
}

export default Review;