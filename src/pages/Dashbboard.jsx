import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Dashboard.css";

import {
  FiEye,
  FiEyeOff,
  FiBell
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [showAccountNumber, setShowAccountNumber] = useState(false);





  const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) {
    return "XXXX XXXX";
  }

  const account = String(accountNumber);

  return `XXXX XXXX ${account.slice(-4)}`;
};

  // =====================================================
  // LOAD USER + TRANSACTIONS
  // =====================================================
    

  useEffect(() => {

  const storedUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");

  // ==========================================
  // CHECK LOGIN
  // ==========================================

  if (!storedUser || storedUser === "undefined" || !token) {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");

    navigate("/login");
    return;
  }

  let loggedInUser;

  try {

    loggedInUser = JSON.parse(storedUser);

  } catch (error) {

    console.error("Invalid loggedInUser:", error);

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");

    navigate("/login");
    return;
  }

  if (!loggedInUser) {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");

    navigate("/login");
    return;
  }

  console.log("Logged in user:", loggedInUser);
  console.log("JWT token:", token);

  // Initially show stored user
  setUser(loggedInUser);


  // ==========================================
  // FETCH TRANSACTIONS
  // ==========================================

  const fetchTransactions = async (
    currentUser,
    jwtToken
  ) => {

    try {

      const response = await fetch(
        "http://localhost:8082/transactions",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          }
        }
      );


      // JWT expired
      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (!response.ok) {

        throw new Error(
          "Failed to fetch transactions"
        );

      }


      const allTransactions =
        await response.json();


      // ==========================================
      // FILTER CURRENT USER TRANSACTIONS
      // ==========================================

      const userTransactions =
        allTransactions.filter(
          (item) =>
            item.senderAccount ===
              currentUser.accountNumber ||

            item.receiverAccount ===
              currentUser.accountNumber
        );


      // ==========================================
      // LATEST FIRST
      // ==========================================

      userTransactions.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );


      // ==========================================
      // SHOW LATEST 5
      // ==========================================

      setTransactions(
        userTransactions.slice(0, 5)
      );


    } catch (error) {

      console.error(
        "Transaction loading error:",
        error
      );

      setTransactions([]);

    } finally {

      setLoadingTransactions(false);

    }

  };


  // ==========================================
  // FETCH LATEST USER FROM DATABASE
  // ==========================================

  const fetchUser = async () => {

    try {

      setLoadingUser(true);


      const response = await fetch(
        `http://localhost:8082/users/${loggedInUser.id}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );


      // ==========================================
      // JWT EXPIRED
      // ==========================================

      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (!response.ok) {

        throw new Error(
          "Failed to fetch user"
        );

      }


      // ==========================================
      // GET USER
      // ==========================================

      const latestUser =
        await response.json();

      console.log(
        "Latest user from database:",
        latestUser
      );


      // ==========================================
      // UPDATE REACT STATE
      // ==========================================

      setUser(latestUser);


      // ==========================================
      // UPDATE LOCAL STORAGE
      // ==========================================

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(latestUser)
      );


      // ==========================================
      // FETCH TRANSACTIONS
      // ==========================================

      await fetchTransactions(
        latestUser,
        token
      );


    } catch (error) {

      console.error(
        "User loading error:",
        error
      );


      // Use stored user if API fails
      setUser(loggedInUser);


      // Still try transactions
      await fetchTransactions(
        loggedInUser,
        token
      );


    } finally {

      setLoadingUser(false);

    }

  };


  // ==========================================
  // START FETCHING
  // ==========================================

  fetchUser();

}, [navigate]);

  // =====================================================
  // LOADING USER
  // =====================================================

  if (loadingUser) {

    return (

      <div className="dashboard-loading">

        Loading Dashboard...

      </div>

    );

  }


  if (!user) {

    return null;

  }


  // =====================================================
  // BALANCE
  // =====================================================

  const balance =
    Number(user.deposit || 0);


  // =====================================================
  // DASHBOARD UI
  // =====================================================

  return (

    <div className="dashboard-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-header">

        <div>

          <p className="greeting">
           {t("Good Morning")}
          </p>

          <h2>
            {user.fullName} 👋
          </h2>

        </div>


       
      </div>


      {/* =================================================
          BALANCE CARD
      ================================================= */}

      <div className="balance-card">

        <div className="balance-header">

          <div>

            <p>
              {t("Availabe Balance")}
            </p>

            <h1>

              {showBalance

                ? `₹${balance.toLocaleString("en-IN")}`

                : "₹ ••••••"

              }

            </h1>

          </div>


          <button
            className="eye-btn"
            onClick={() =>
              setShowBalance(
                !showBalance
              )
            }
          >

            {showBalance

              ? <FiEye />

              : <FiEyeOff />

            }

          </button>

        </div><br></br>


        {/* =================================================
            ACCOUNT DETAILS
        ================================================= */}
        {/* <div className="account-number-box"> */}
        <div className="account-number-box">

  <span>
    {t("Account Number")}
  </span>

  <div className="account-number-row">

    <h3>
      {user.accountNumber
        ? showAccountNumber
          ? String(user.accountNumber)
          : `XXXX XXXX ${String(user.accountNumber).slice(-4)}`
        : "XXXX XXXX"
      }
    </h3>

    <button
      type="button"
      className="account-eye-btn"
      onClick={() =>
        setShowAccountNumber(!showAccountNumber)
      }
      aria-label={
        showAccountNumber
          ? "Hide account number"
          : "Show account number"
      }
    >

      {showAccountNumber ? (
        <FiEyeOff />
      ) : (
        <FiEye />
      )}

    </button>

  </div>

</div>
 </div>

     

      


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <section className="dashboard-section">

        <div className="section-title">

          <h2>
            Quick Actions
          </h2>

        </div>


        <div className="quick-actions">


          {/* SEND MONEY */}

          <button
            onClick={() =>
              navigate("/send-money")
            }
          >

            <span>
              💸
            </span>

            <p>
              Send Money
            </p>

          </button>


          {/* DEPOSIT */}

          <button
            onClick={() =>
              navigate("/deposit")
            }
          >

            <span>
              💰
            </span>

            <p>
              Deposit
            </p>

          </button>


          {/* TRANSACTIONS */}

          <button
            onClick={() =>
              navigate("/transactions")
            }
          >

            <span>
              📄
            </span>

            <p>
              {t("Transactions")}
              Transactions
            </p>

          </button>


          {/* PROFILE */}

          <button
            onClick={() =>
              navigate("/profile")
            }
          >

            <span>
              👤
            </span>

            <p>
              Profile
            </p>

          </button>


        </div>

      </section>


      {/* =================================================
          RECENT TRANSACTIONS
      ================================================= */}

      <section className="dashboard-section recent-section">


        <div className="section-title">

          <h2>
            Recent Transactions
          </h2>


          <button
            onClick={() =>
              navigate("/transactions")
            }
          >

            View All

          </button>

        </div>


        {/* LOADING */}

        {loadingTransactions ? (

          <div className="transaction">

            <div className="transaction-details">

              <h3>
                Loading Transactions...
              </h3>

            </div>

          </div>

        ) : transactions.length === 0 ? (

          /* NO TRANSACTIONS */

          <div className="transaction">

            <div className="transaction-details">

              <h3>
                No Recent Transactions
              </h3>

              <p>
                You haven't made any
                transactions yet.
              </p>

            </div>

          </div>

        ) : (

          /* TRANSACTIONS */

          transactions.map((item) => {

            const isCredit =
              item.receiverAccount ===
              user.accountNumber;


            return (

              <div
                className="transaction"
                key={item.id}
              >


                {/* ICON */}

                <div
                  className={
                    `transaction-icon ${
                      isCredit
                        ? "credit"
                        : "debit"
                    }`
                  }
                >

                  {isCredit
                    ? "↓"
                    : "↑"}

                </div>


                {/* DETAILS */}

                <div className="transaction-details">

                  <h3>

                    {isCredit
                      ? "Money Received"
                      : "Money Sent"}

                  </h3>

                  <p>
  {isCredit
    ? `From ${maskAccountNumber(item.senderAccount)}`
    : `To ${maskAccountNumber(item.receiverAccount)}`
  }
</p>

               


                  {item.remarks && (

                    <p>
                      {item.remarks}
                    </p>

                  )}


                  <small>

                    {new Date(
                      item.date
                    ).toLocaleString("en-IN")}

                  </small>

                </div>


                {/* AMOUNT */}

                <strong
                  className={
                    isCredit
                      ? "credit-text"
                      : "debit-text"
                  }
                >

                  {isCredit
                    ? "+"
                    : "-"}

                  ₹
                  {Number(
                    item.amount
                  ).toLocaleString("en-IN")}

                </strong>


              </div>

            );

          })

        )}

      </section>


    </div>
    

  );

}

export default Dashboard;