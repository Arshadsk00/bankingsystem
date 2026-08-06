import "../css/Form.css";

function PersonalDetails({ formData, setFormData, errors }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const numbers = value.replace(/\D/g, "");

      if (numbers.length <= 10) {
        setFormData({
          ...formData,
          mobile: numbers,
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-card">

      <h2>Personal Details</h2>
      <p className="subtitle">Enter your personal information</p>

      <div className="form-grid">

        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors?.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Father Name *</label>
          <input
            type="text"
            name="fatherName"
            placeholder="Enter Father Name"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors?.dob && <span className="error">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            placeholder="10-digit Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors?.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender *</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default PersonalDetails;