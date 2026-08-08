import "../css/Form.css";

function AccountDetails({ formData, setFormData }) {

  return (

    

    <div className="form-card">

      <h2>Account Setup</h2>

      <p className="subtitle">
        Configure your new bank account.
      </p>
 
      <div className="form-grid">

        <div className="form-group">

          <label>Account Type *</label>

          <select
            name="accountType"
            value={formData.accountType}
            onChange={(e) =>
              setFormData({
                ...formData,
                accountType: e.target.value,
              })
            }
          >
            <option value="">Select Account</option>
            <option>Savings Account</option>
            <option>Current Account</option>
            <option>Salary Account</option>
          </select>

        </div>

        <div className="form-group">

          <label>Nominee Name *</label>

          <input
            type="text"
            name="nominee"
            placeholder="Nominee Name"
            value={formData.nominee}
            onChange={(e) =>
              setFormData({
                ...formData,
                nominee: e.target.value,
              })
            }
          />

        </div>

        <div className="form-group">

          <label>Initial Deposit *</label>

          <input
            type="number"
            name="deposit"
            placeholder="Minimum ₹2000"
            value={formData.deposit}
            onChange={(e) =>
              setFormData({
                ...formData,
                deposit: e.target.value,
              })
            }
          />

        </div>

        <div className="form-group">

          <label>Create PIN *</label>

          <input
            type="password"
            maxLength={4}
            value={formData.pin}
            onChange={(e) => {

              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 4) {
                setFormData({
                  ...formData,
                  pin: value,
                });
              }

            }}
          />

        </div>

        <div className="form-group">

          <label>Confirm PIN *</label>

          <input
            type="password"
            maxLength={4}
            value={formData.confirmPin}
            onChange={(e) => {

              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 4) {
                setFormData({
                  ...formData,
                  confirmPin: value,
                });
              }

            }}
          />

        </div>

      </div>

      <div className="service-box">

        <input
          type="checkbox"
          checked={formData.debitCard || false}
          onChange={(e) =>
            setFormData({
              ...formData,
              debitCard: e.target.checked,
            })
          }
        />

        <div>

          <h4>Debit Card</h4>

          <p>
            Receive a Visa Debit Card with ATM, UPI and Online Banking access.
          </p>

        </div>

      </div>

    </div>

  );
}

export default AccountDetails;