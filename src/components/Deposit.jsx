import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  // =========================
  // LOAD LOGGED-IN USER
  // =========================

  useEffect(() => {

    const loggedInUser =
      JSON.parse(
        localStorage.getItem("loggedInUser")
      );

    const token =
      localStorage.getItem("token");

    if (!loggedInUser || !token) {

      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("token");

      navigate("/login");

      return;
    }

    setUser(loggedInUser);

  }, [navigate]);


  // =========================
  // LOADING
  // =========================

  if (!user) {
    return null;
  }


  // =========================
  // CURRENT BALANCE
  // =========================

  const balance =
    Number(user.deposit || 0);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // DEPOSIT
  // =========================

  const handleDeposit = async (e) => {

    e.preventDefault();


    // =========================
    // PIN VALIDATION
    // =========================

    if (form.pin !== user.pin) {

      alert("Invalid PIN");

      return;
    }


    // =========================
    // AMOUNT VALIDATION
    // =========================

    const depositAmount =
      Number(form.amount);


    if (
      !form.amount ||
      depositAmount <= 0
    ) {

      alert(
        "Enter a valid deposit amount."
      );

      return;
    }


    // =========================
    // JWT
    // =========================

    const token =
      localStorage.getItem("token");


    if (!token) {

      alert(
        "Your session has expired. Please login again."
      );

      navigate("/login");

      return;
    }


    try {

      // =========================
      // CALL SPRING BOOT
      // =========================

      const response =
        await axios.post(

          "http://localhost:8082/transactions/deposit",

          {
            accountNumber:
              user.accountNumber,

            amount:
              depositAmount,

            remarks:
              form.remarks.trim() ||
              "Cash Deposit"
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json"
            }
          }

        );


      console.log(
        "Deposit Response:",
        response.data
      );


      // =========================
      // UPDATE LOCAL USER
      // =========================
      //
      // Backend has already updated
      // the database balance.
      //
      // This only updates React UI
      // immediately.

      const updatedUser = {

        ...user,

        deposit:
          balance + depositAmount

      };


      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );


      setUser(updatedUser);


      // =========================
      // CLEAR FORM
      // =========================

      setForm({

        amount: "",
        remarks: "",
        pin: ""

      });


      // =========================
      // SUCCESS
      // =========================

      alert(
        "Deposit Successful!"
      );


      // Go to dashboard

      navigate("/dashboard");


    } catch (error) {

      console.error(
        "Deposit Error:",
        error
      );


      // =========================
      // BACKEND ERROR
      // =========================

      if (error.response) {

        console.log(
          "Backend Response:",
          error.response.data
        );


        if (
          error.response.status === 401
        ) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "loggedInUser"
          );

          alert(
            "Your session has expired. Please login again."
          );

          navigate("/login");

          return;
        }


        const backendMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Deposit failed.";


        alert(
          backendMessage
        );

      }

      else if (error.request) {

        alert(
          "Backend server is not responding. Make sure Spring Boot is running on port 8082."
        );

      }

      else {

        alert(
          "Something went wrong while depositing money."
        );

      }

    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="deposit-page">


      {/* =========================
          BALANCE
      ========================= */}

      <div className="deposit-balance">

        <h3>
          Available Balance
        </h3>

        <h1>
          ₹{balance.toLocaleString("en-IN")}
        </h1>

      </div>


      {/* =========================
          DEPOSIT FORM
      ========================= */}

      <form
        className="deposit-card"
        onSubmit={handleDeposit}
      >

        <h2>

          💰 Deposit Money

        </h2>


        {/* AMOUNT */}

        <div className="deposit-input">

          <FiDollarSign />

          <input
            type="number"
            name="amount"
            placeholder="Deposit Amount"
            value={form.amount}
            onChange={handleChange}
            min="1"
            required
          />

        </div>


        {/* REMARKS */}

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


        {/* PIN */}

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


        {/* BUTTON */}

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