import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiSend,
  FiAlertTriangle
} from "react-icons/fi";

import "../css/Contact.css";

function Contact() {
    const [form, setForm] = useState({
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: ""
});
const handleChange = (e) => {

  setForm({
    ...form,
    [e.target.name]: e.target.value
  });

};

  const handleSubmit = (e) => {
    e.preventDefault();
     const contacts =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

  contacts.unshift({

    id: Date.now(),

    ...form,

    status: "Pending",

    date: new Date().toLocaleString("en-IN")

  });

  localStorage.setItem(
    "contactMessages",
    JSON.stringify(contacts)
  );

  alert("Your message has been sent successfully.");

  setForm({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: ""
  });

};
   

  return (

    <div className="contact-page">

      <div className="contact-header">

        <h1>Contact SAFE BANK</h1>

        <p>
          We're here to help you with your banking needs.
        </p>

      </div>

      {/* Contact Cards */}

      <div className="contact-cards">

        <div className="contact-card">

          <FiPhone className="contact-icon"/>

          <h3>Customer Care</h3>
            <a href="+919988776655"> contact us</a>
          <p>1800-123-4567</p>

        </div>

        <div className="contact-card">

          <FiMail className="contact-icon"/>

          <h3>Email</h3>

          <p>support@safebank.com</p>

        </div>

        <div className="contact-card">

          <FiMapPin className="contact-icon"/>

          <h3>Head Office</h3>

          <p>Hyderabad, Telangana</p>

        </div>

        <div className="contact-card">

          <FiMessageSquare className="contact-icon"/>

          <h3>AI Assistant</h3>

          <p>Available 24×7</p>

        </div>

      </div>

      <div className="contact-container">

        {/* Contact Form */}

        <div className="contact-form">

          <h2>Send us a Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">

              <FiSend/>

              Send Message

            </button>

          </form>

        </div>

        {/* Right Side */}

        <div className="contact-right">

          <div className="info-card">

            <h3>Working Hours</h3>

            <p>Monday - Saturday</p>

            <strong>9:00 AM - 6:00 PM</strong>

          </div>

          <div className="info-card emergency">

            <FiAlertTriangle className="alert-icon"/>

            <h3>Emergency Support</h3>

            <p>Lost Debit Card</p>

            <p>Report Fraud</p>

            <strong>1800-111-999</strong>

          </div>

          <div className="info-card">

            <h3>Need Instant Help?</h3>

            <p>

              Use the SAFE BANK AI Assistant available
              at the bottom-right corner.

            </p>

          </div>

        </div>

      </div>

      {/* FAQ */}

      <div className="faq">

        <h2>Frequently Asked Questions</h2>

        <details>

          <summary>How do I create a new account?</summary>

          <p>
            Click "Create New Account", complete
            Personal Details, KYC verification,
            Account Details and submit your application.
          </p>

        </details>

        <details>

          <summary>How do I deposit money?</summary>

          <p>
            Login → Dashboard → Deposit →
            Enter amount → Confirm PIN.
          </p>

        </details>

        <details>

          <summary>How do I send money?</summary>

          <p>
            Dashboard → Send Money →
            Enter beneficiary details →
            Confirm PIN.
          </p>

        </details>

        <details>

          <summary>How do I check application status?</summary>

          <p>
            Use the Application Status page
            from the home screen.
          </p>

        </details>

      </div>

    </div>

  );

}

export default Contact;