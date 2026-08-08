import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    bank: "",
    account: "",
    ifsc: "",
    amount: "",
    remarks: "",
    pin: ""
  });


  // =====================================================
  // LOAD USER FROM BACKEND
  // =====================================================

  useEffect(() => {

    const loggedInUser =
      JSON.parse(
        localStorage.getItem("loggedInUser")
      );

    const token =
      localStorage.getItem("token");


    // No logged-in user
    if (!loggedInUser) {
      navigate("/login");
      return;
    }


    // No JWT
    if (!token) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
      return;
    }


    const fetchLatestUser = async () => {

      try {
              const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
        // IMPORTANT:
        // Use loggedInUser.id here.
        // NOT user.id because user is initially null.

        const response = await axios.get(
          `http://localhost:8082/users/${loggedInUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );


        if (response.data) {

          setUser(response.data);


          // Keep localStorage updated

          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data)
          );

        } else {

          setUser(loggedInUser);

        }

      } catch (error) {

        console.error(
          "User loading error:",
          error
        );


        // If JWT expired/invalid

        if (
          error.response &&
          error.response.status === 401
        ) {

          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");

          alert(
            "Your session has expired. Please login again."
          );

          navigate("/login");

          return;
        }


        // Fallback

        setUser(loggedInUser);

      }

    };


    fetchLatestUser();

  }, [navigate]);


  // =====================================================
  // LOADING
  // =====================================================

  if (!user) {

    return (

      <div className="send-page">

        <div className="send-card">

          <h2>
            Loading...
          </h2>

        </div>

      </div>

    );

  }


  // =====================================================
  // CURRENT BALANCE
  // =====================================================

  const balance =
    Number(user.deposit || 0);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // =====================================================
  // SEND MONEY
  // =====================================================

  const handleTransfer = async (e) => {

    e.preventDefault();


    // =================================================
    // PIN VALIDATION
    // =================================================

    if (
      form.pin !== String(user.pin)
    ) {

      alert("Invalid PIN");

      return;

    }


    // =================================================
    // AMOUNT VALIDATION
    // =================================================

    const transferAmount =
      Number(form.amount);


    if (
      !form.amount ||
      transferAmount <= 0
    ) {

      alert(
        "Enter a valid amount."
      );

      return;

    }


    // =================================================
    // BALANCE VALIDATION
    // =================================================

    if (
      transferAmount > balance
    ) {

      alert(
        "Insufficient Balance."
      );

      return;

    }


    // =================================================
    // ACCOUNT VALIDATION
    // =================================================

    if (
      !form.account.trim()
    ) {

      alert(
        "Enter receiver account number."
      );

      return;

    }


    // =================================================
    // PREVENT SELF TRANSFER
    // =================================================

    if (
      form.account.trim() ===
      String(user.accountNumber)
    ) {

      alert(
        "You cannot send money to your own account."
      );

      return;

    }


    try {

      setLoading(true);


      // =================================================
      // GET JWT
      // =================================================

      const token =
        localStorage.getItem("token");


      if (!token) {

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;

      }


      // =================================================
      // SEND MONEY API
      // =================================================

      const response =
        await axios.post(

          "http://localhost:8082/transactions/send",

          {
            senderAccount:
              user.accountNumber,

            receiverAccount:
              form.account.trim(),

            amount:
              transferAmount,

            remarks:
              form.remarks.trim() ||
              "Money Transfer"
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
        "Transaction Response:",
        response.data
      );


      // =================================================
      // FETCH UPDATED USER
      // =================================================

      const updatedUserResponse =
        await axios.get(

          `http://localhost:8082/users/${user.id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json"
            }
          }

        );


      const updatedUser =
        updatedUserResponse.data;


      // =================================================
      // UPDATE REACT STATE
      // =================================================

      setUser(updatedUser);


      // =================================================
      // UPDATE LOCAL STORAGE
      // =================================================

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );


      // =================================================
      // SUCCESS
      // =================================================

      alert(
        "Money Sent Successfully!"
      );


      // =================================================
      // CLEAR FORM
      // =================================================

      setForm({
        name: "",
        bank: "",
        account: "",
        ifsc: "",
        amount: "",
        remarks: "",
        pin: ""
      });


      // =================================================
      // GO TO TRANSACTIONS
      // =================================================

      navigate("/transactions");


    } catch (error) {

      console.error(
        "Transaction Error:",
        error
      );


      // =================================================
      // JWT ERROR
      // =================================================

      if (
        error.response &&
        error.response.status === 401
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;

      }


      // =================================================
      // FORBIDDEN
      // =================================================

      if (
        error.response &&
        error.response.status === 403
      ) {

        console.log(
          "403 Backend Response:",
          error.response.data
        );

        alert(
          "You are not authorized for this operation."
        );

        return;

      }


      // =================================================
      // BACKEND ERROR
      // =================================================

      if (error.response) {

        console.log(
          "Backend Response:",
          error.response.data
        );


        const backendMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Transaction failed.";


        alert(
          backendMessage
        );

      }


      // =================================================
      // SERVER NOT REACHABLE
      // =================================================

      else if (error.request) {

        alert(
          "Backend server is not responding. Make sure Spring Boot is running on port 8082."
        );

      }


      // =================================================
      // OTHER ERROR
      // =================================================

      else {

        alert(
          "Something went wrong while sending money."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="send-page">


      {/* =================================================
          BALANCE
      ================================================= */}

      <div className="balance-card2">

        <h3>
          Available Balance
        </h3>

        <h1>
          ₹{balance.toLocaleString("en-IN")}
        </h1>

      </div>


      {/* =================================================
          SEND MONEY FORM
      ================================================= */}

      <form
        className="send-card"
        onSubmit={handleTransfer}
      >


        <h2>

          <FiSend />

          Send Money

        </h2>


        {/* BENEFICIARY NAME */}

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


        {/* BANK NAME */}

        <div className="input-group">

          <span>
            🏦
          </span>

          <input
            type="text"
            name="bank"
            placeholder="Bank Name"
            value={form.bank}
            onChange={handleChange}
            required
          />

        </div>


        {/* RECEIVER ACCOUNT */}

        <div className="input-group">

          <FiCreditCard />

          <input
            type="text"
            name="account"
            placeholder="Receiver Account Number"
            value={form.account}
            onChange={handleChange}
            required
          />

        </div>


        {/* IFSC */}

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


        {/* AMOUNT */}

        <div className="input-group">

          <span>
            💰
          </span>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            min="1"
            required
          />

        </div>


        {/* REMARKS */}

        <div className="input-group">

          <span>
            📝
          </span>

          <input
            type="text"
            name="remarks"
            placeholder="Remarks (Optional)"
            value={form.remarks}
            onChange={handleChange}
          />

        </div>


        {/* PIN */}

        <div className="input-group">

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


        {/* TRANSFER BUTTON */}

        <button
          className="send-btn"
          type="submit"
          disabled={loading}
        >

          <FiSend />

          {loading
            ? "Processing..."
            : "Transfer Money"}

        </button>


      </form>

    </div>

  );

}

export default SendMoney;