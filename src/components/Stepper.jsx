import "../css/Stepper.css";

function Stepper({ step }) {
  return (
    <div className="stepper-container">

      <div className="step-item">
        <div className={step >= 1 ? "circle active" : "circle"}>1</div>
        <p>Personal</p>
      </div>

      <div className={step >= 2 ? "line active-line" : "line"}></div>

      <div className="step-item">
        <div className={step >= 2 ? "circle active" : "circle"}>2</div>
        <p>KYC</p>
      </div>

      <div className={step >= 3 ? "line active-line" : "line"}></div>

      <div className="step-item">
        <div className={step >= 3 ? "circle active" : "circle"}>3</div>
        <p>Account</p>
      </div>

    </div>
  );
}

export default Stepper;