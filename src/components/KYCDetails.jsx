import "../css/Form.css";

function KYCDetails({ formData, setFormData }) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const today = new Date();

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (

    <div className="form-card">

      <h2>KYC Verification</h2>
      <p className="subtitle">
        Verify your identity for secure banking.
      </p>

      <div className="form-grid">

        <div className="form-group">
          <label>Aadhaar Number *</label>

          <input
            type="text"
            name="aadhaar"
            placeholder="Enter 12-digit Aadhaar"
            value={formData.aadhaar}
            maxLength={12}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 12) {
                setFormData({
                  ...formData,
                  aadhaar: value,
                });
              }
            }}
          />
        </div>

        <div className="form-group">
          <label>PAN Number *</label>

          <input
            type="text"
            name="pan"
            placeholder="ABCDE1234F"
            value={formData.pan}
            maxLength={10}
            onChange={(e) =>
              setFormData({
                ...formData,
                pan: e.target.value.toUpperCase(),
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            max={maxDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Residential Address *</label>

          <textarea
            rows="4"
            name="address"
            placeholder="Enter Complete Address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

      </div>

    </div>

  );
}

export default KYCDetails;