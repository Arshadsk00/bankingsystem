import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDollarSign,
  FiFileText,
  FiLock
} from "react-icons/fi";

import "../css/Deposit.css";

function Deposit() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
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

  const balance = Number(user.deposit || 0);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleDeposit = (e) => {

    e.preventDefault();

    if (form.pin !== user.pin) {
      alert("Invalid PIN");
      return;
    }

    if (Number(form.amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const depositAmount = Number(form.amount);

    const newBalance = balance + depositAmount;

    // Update applications

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApplications =
      applications.map((app) => {

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

    // Save transaction

    const transactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.unshift({

      id: Date.now(),

      mobile: user.mobile,

      type: "Credit",

      title: "Cash Deposit",

      amount: depositAmount,

      remarks: form.remarks || "Cash Deposit",

      date: new Date().toLocaleString("en-IN"),

      status: "Success"

    });

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

    alert("Deposit Successful!");

    navigate("/dashboard");

  };

  return (

    <div className="deposit-page">

      <div className="deposit-balance">

        <h3>Available Balance</h3>

        <h1>₹{balance.toLocaleString()}</h1>

      </div>

      <form
        className="deposit-card"
        onSubmit={handleDeposit}
      >

        <h2>

          💰 Deposit Money

        </h2>

        <div className="deposit-input">

          <FiDollarSign />

          <input
            type="number"
            name="amount"
            placeholder="Deposit Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

        </div>

        <div className="deposit-input">

          <FiFileText />

          <input
            type="text"
            name="remarks"
            placeholder="Remarks (Optional)"
            value={form.remarks}
            onChange={handleChange}
          />

        </div>

        <div className="deposit-input">

          <FiLock />

          <input
            type="password"
            name="pin"
            maxLength={4}
            placeholder="Enter 4 Digit PIN"
            value={form.pin}
            onChange={handleChange}
            required
          />

        </div>

        <button
          className="deposit-btn"
          type="submit"
        >

          Deposit Money

        </button>

      </form>

    </div>

  );

}

export default Deposit;