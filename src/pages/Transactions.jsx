import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiRefreshCw
} from "react-icons/fi";

import "../css/Transactions.css";

function Transactions() {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD TRANSACTIONS
  // =========================

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    const token = localStorage.getItem("token");

    // No user
    if (!user) {
      navigate("/login");
      return;
    }

    // No JWT
    if (!token) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
      return;
    }

    fetchTransactions(user, token);

  }, [navigate]);


  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions = async (user, token) => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "http://localhost:8082/transactions",
        {
          method: "GET",

          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );


      // =========================
      // JWT EXPIRED / INVALID
      // =========================

      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;
      }


      // =========================
      // OTHER ERROR
      // =========================

      if (!response.ok) {
        throw new Error(
          "Failed to fetch transactions"
        );
      }


      // =========================
      // GET BACKEND DATA
      // =========================

      const allTransactions =
        await response.json();


      // =========================
      // FILTER CURRENT USER
      // =========================

      const userTransactions =
        allTransactions.filter(
          (item) =>
            item.senderAccount ===
              user.accountNumber ||

            item.receiverAccount ===
              user.accountNumber
        );


      // =========================
      // LATEST FIRST
      // =========================

      userTransactions.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );


      setTransactions(
        userTransactions
      );

    } catch (err) {

      console.error(
        "Transaction loading error:",
        err
      );

      setError(
        "Unable to load transactions."
      );

      setTransactions([]);

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // REFRESH
  // =========================

  const handleRefresh = () => {

    const user = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    const token =
      localStorage.getItem("token");

    if (user && token) {
      fetchTransactions(
        user,
        token
      );
    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="transactions-page">

        <div className="empty">

          <h2>
            Loading Transactions...
          </h2>

        </div>

      </div>

    );

  }


  // =========================
  // UI
  // =========================

  return (

    <div className="transactions-page">


      {/* HEADER */}

      <div className="transactions-header">

        <div>

          <h1>
            Transaction History
          </h1>

          <p>
            View all your banking transactions
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={handleRefresh}
          title="Refresh Transactions"
        >

          <FiRefreshCw />

        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="empty">

          <h2>
            {error}
          </h2>

          <button
            onClick={handleRefresh}
            className="refresh-btn"
          >
            Try Again
          </button>

        </div>

      )}


      {/* NO TRANSACTIONS */}

      {!error &&
        transactions.length === 0 && (

          <div className="empty">

            <h2>
              No Transactions Found
            </h2>

            <p>
              Deposit or transfer money to see
              your transaction history.
            </p>

          </div>

        )}


      {/* TRANSACTIONS */}

      {!error &&
        transactions.length > 0 && (

          <div className="transaction-list">

            {transactions.map((item) => {

              const user =
                JSON.parse(
                  localStorage.getItem(
                    "loggedInUser"
                  )
                );

              const isCredit =
                item.receiverAccount ===
                user?.accountNumber;


              return (

                <div
                  key={item.id}
                  className="transaction-card"
                >

                  {/* LEFT */}

                  <div className="left">

                    {/* ICON */}

                    <div
                      className={
                        isCredit
                          ? "icon credit"
                          : "icon debit"
                      }
                    >

                      {isCredit
                        ? <FiArrowDownCircle />
                        : <FiArrowUpCircle />
                      }

                    </div>


                    {/* DETAILS */}

                    <div className="transaction-details">

                      <h3>

                        {isCredit
                          ? "Money Received"
                          : "Money Sent"
                        }

                      </h3>


                      <p>

                        {isCredit
                          ? `From: ${item.senderAccount}`
                          : `To: ${item.receiverAccount}`
                        }

                      </p>


                      {item.remarks && (

                        <p className="remarks">

                          {item.remarks}

                        </p>

                      )}


                      <small>

                        {new Date(
                          item.date
                        ).toLocaleString("en-IN")}

                      </small>


                      <small
                        style={{
                          display: "block",
                          marginTop: "5px"
                        }}
                      >

                        Transaction ID:{" "}
                        {item.transactionId}

                      </small>


                      <small
                        style={{
                          display: "block",
                          marginTop: "5px"
                        }}
                      >

                        Status:{" "}

                        <strong>
                          {item.status}
                        </strong>

                      </small>

                    </div>

                  </div>


                  {/* AMOUNT */}

                  <div
                    className={
                      isCredit
                        ? "amount credit-text"
                        : "amount debit-text"
                    }
                  >

                    {isCredit
                      ? "+"
                      : "-"
                    }

                    ₹
                    {Number(
                      item.amount
                    ).toLocaleString("en-IN")}

                  </div>

                </div>

              );

            })}

          </div>

        )}

    </div>

  );

}

export default Transactions;