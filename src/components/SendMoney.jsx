import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSend,
  FiUser,
  FiCreditCard,
  FiHash,
  FiLock
} from "react-icons/fi";

import "../css/SendMoney.css";

function SendMoney() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    bank: "",
    account: "",
    ifsc: "",
    amount: "",
    remarks: "",
    pin: ""
  });

  useEffect(() => {

    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setUser(loggedInUser);

  }, [navigate]);

  if (!user) return null;

  const balance = Number(user.deposit);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleTransfer = (e) => {

    e.preventDefault();

    if (form.pin !== user.pin) {
      alert("Invalid PIN");
      return;
    }

    if (Number(form.amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (Number(form.amount) > balance) {
      alert("Insufficient Balance.");
      return;
    }

    const transferAmount = Number(form.amount);

    const newBalance = balance - transferAmount;

    // Update applications

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApplications = applications.map((app) => {

      if (app.mobile === user.mobile) {

        return {
          ...app,
          deposit: newBalance
        };

      }

      return app;

    });

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    // Update logged in user

    const updatedUser = {
      ...user,
      deposit: newBalance
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    // Save Transaction

    const transactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.unshift({

      id: Date.now(),
    mobile: user.mobile,
      type: "Debit",
      title: "Money Transfer",
      receiver: form.name,
      bank: form.bank,
      account: form.account,
      amount: transferAmount,
      remarks: form.remarks || "Money Transfer",
      date: new Date().toLocaleString("en-IN"),
     status: "Success"
    });

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

    alert("Money Sent Successfully!");

    navigate("/transactions");

  };

  return (

    <div className="send-page">

      <div className="balance-card2">

        <h3>Available Balance</h3>

        <h1>₹{balance.toLocaleString()}</h1>

      </div>

      <form
        className="send-card"
        onSubmit={handleTransfer}
      >

        <h2>

          <FiSend />

          Send Money

        </h2>

        <div className="input-group">

          <FiUser />

          <input
            type="text"
            name="name"
            placeholder="Beneficiary Name"
            value={form.name}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-group">

          🏦

          <input
            type="text"
            name="bank"
            placeholder="Bank Name"
            value={form.bank}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-group">

          <FiCreditCard />

          <input
            type="text"
            name="account"
            placeholder="Account Number"
            value={form.account}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-group">

          <FiHash />

          <input
            type="text"
            name="ifsc"
            placeholder="IFSC Code"
            value={form.ifsc}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-group">

          💰

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-group">

          📝

          <input
            type="text"
            name="remarks"
            placeholder="Remarks (Optional)"
            value={form.remarks}
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <FiLock />

          <input
            type="password"
            name="pin"
            maxLength={4}
            placeholder="Enter PIN"
            value={form.pin}
            onChange={handleChange}
            required
          />

        </div>

        <button
          className="send-btn"
          type="submit"
        >

          Transfer Money

        </button>

      </form>

    </div>

  );

}

export default SendMoney;