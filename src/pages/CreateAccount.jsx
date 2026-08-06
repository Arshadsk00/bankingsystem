import { useState } from "react";
import Stepper from "../components/Stepper";
import PersonalDetails from "../components/PersonalDetails";
import KYCDetails from "../components/KYCDetails";
import AccountDetails from "../components/AccountDetails";
import "../css/CreateAccount.css";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";

function CreateAccount() {

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({

   fullName: "",
  fatherName: "",
  dob: "",
  mobile: "",
  email: "",
  gender: "",

  aadhaar: "",
  pan: "",
  address: "",

  accountType: "",
  nominee: "",
  deposit: "",
  pin: "",
  confirmPin: "",
});

 
  const nextStep = () => {

  if (step === 1) {

    if (
      !formData.fullName ||
      !formData.fatherName ||
      !formData.dob ||
      !formData.mobile ||
      !formData.email ||
      !formData.gender
    ) {
      alert("Please fill all Personal Details.");
      return;
    }

    if (formData.mobile.length !== 10) {
      setErrors({
    mobile:"Mobile number must contain exactly 10 digits."
      });

return;
     
    }

    const dob = new Date(formData.dob);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      setErrors({
dob:"Age must be 18 years or above."
});
return;
      
    }
  }

  if (step === 2) {

    if (
      !formData.aadhaar ||
      !formData.pan ||
      !formData.address
    ) {
      alert("Please complete all KYC Details.");
      return;
    }

    if (formData.aadhaar.length !== 12) {
      
      alert("Aadhaar number must contain exactly 12 digits.");
      return;
    }

    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panPattern.test(formData.pan)) {
      alert("Enter a valid PAN Number.");
      return;
    }

  }

  if (step === 3) {

    if (
      !formData.accountType ||
      !formData.nominee ||
      !formData.deposit ||
      !formData.pin ||
      !formData.confirmPin
    ) {
      alert("Please complete Account Details.");
      return;
    }

    if (formData.pin.length !== 4) {
      alert("PIN must contain exactly 4 digits.");
      return;
    }

    if (formData.pin !== formData.confirmPin) {
      alert("PIN and Confirm PIN do not match.");
      return;
    }

  }

  setStep(step + 1);

};

  const prevStep = () => {
    setStep(step - 1);
  };
  const handleReview = () => {

  if (
    !formData.accountType ||
    !formData.nominee ||
    !formData.deposit ||
    !formData.pin ||
    !formData.confirmPin
  ) {
    alert("Please complete Account Details.");
    return;
  }

  if (formData.pin.length !== 4) {
    alert("PIN must contain exactly 4 digits.");
    return;
  }

  if (formData.pin !== formData.confirmPin) {
    alert("PIN and Confirm PIN do not match.");
    return;
  }

  navigate("/review", {
    state: formData,
  });
};

  return (
  <div className="create-page">
    <LeftPanel/>
    <div className="right-panel">

      {/* Show Home Back button only on Step 1 */}
      {step === 1 && (
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      )}

      <h1>Create Account</h1>

      <Stepper step={step} />

      {/* Step 1 */}
      {step === 1 && (
        <>
          <PersonalDetails 
           formData={formData}
           setFormData={setFormData}  errors={errors}/>
           

          <button onClick={nextStep}>
            Continue
          </button>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <KYCDetails 
          formData={formData}
          setFormData={setFormData}  errors={errors}/>
         

          <div className="btn-group">
            <button onClick={prevStep}>← Back</button>
            <button onClick={nextStep}>Continue</button>
          </div>  
        </>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <>
          <AccountDetails 
          formData={formData}
          setFormData={setFormData}   errors={errors}/>
        

          <div className="btn-group">
            <button onClick={prevStep}>← Back</button>
            
         

<button onClick={handleReview}>
  Review Details
</button>
          </div>
        </>
      )}

    </div>
    </div>
  );
}

export default CreateAccount;