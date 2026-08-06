import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

function Dashboard() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
const [showBalance,setShowBalance]=useState(true);
const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setUser(loggedInUser);

  const allTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const userTransactions =
    allTransactions.filter(
      (item) => item.mobile === loggedInUser.mobile
    );

  setTransactions(userTransactions);

}, [navigate]);

   if (!user) {
  return (
    <div className="dashboard-loading">
      Loading...
    </div>
  );
}

  const balance = Number(user.deposit || 0);

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <p className="greeting">Good Morning,</p>
          <h2>{user.fullName} 👋 </h2>
        </div>

        <button className="notification-btn">
          🔔
        </button>

      </div>


      {/* Balance Card */}

      <div className="balance-card">

    <div className="balance-header">

        <div>

            <p>Available Balance</p>

            <h1>
                {showBalance
                ? `₹${balance.toLocaleString()}`
                : "₹ ••••••"}
            </h1>

        </div>

        <button
        className="eye-btn"
        onClick={()=>setShowBalance(!showBalance)}
        >
            {showBalance ? <FiEye/> : <FiEyeOff/>}
        </button>

    </div>

    <div className="balance-footer">

        <div>

            <span>Account</span>

            <h3>{user.accountType}</h3>

        </div>

        <div>

            <span>Account Number</span>

            <h3>
                XXXX XXXX {String(user.mobile).slice(-4)}
            </h3>

        </div>

    </div>

</div>


      {/* Quick Actions */}

      <section className="dashboard-section">

        <div className="section-title">

          <h2>Quick Actions</h2>

        </div>

        <div className="quick-actions">

          <button onClick={() => navigate("/send-money")}>
            <span>💸</span>
            <p>Send Money</p>
          </button>

          <button onClick={() => navigate("/deposit")}>
            <span>💰</span>
            <p>Deposit</p>
          </button>

          <button onClick={() => navigate("/transactions")}>
            <span>📄</span>
            <p>Transactions</p>
          </button>

          <button onClick={() => navigate("/profile")}>
            <span>👤</span>
            <p>Profile</p>
          </button>

        </div>

      </section>


      {/* Recent Transactions */}
      <section className="dashboard-section">

  <div className="section-title">

    <h2>Recent Transactions</h2>

    <button
      onClick={() => navigate("/transactions")}
    >
      View All
    </button>

  </div>

  <div className="transactions">

    {transactions.length === 0 ? (

      <div className="transaction">

        <div className="transaction-details">

          <h3>No Recent Transactions</h3>

          <p>You haven't made any transactions yet.</p>

        </div>

      </div>

    ) : (

      transactions.slice(0,5).map((item) => (

        <div
          className="transaction"
          key={item.id}
        >

          <div
            className={`transaction-icon ${
              item.type === "Credit"
                ? "credit"
                : "debit"
            }`}
          >

            {item.type === "Credit" ? "↓" : "↑"}

          </div>

          <div className="transaction-details">

            <h3>{item.title}</h3>

            <p>

              {item.type === "Debit"

                ? `To ${item.receiver}`

                : item.remarks}

            </p>

            <small>{item.date}</small>

          </div>

          <strong
            className={
              item.type === "Credit"

                ? "credit-text"

                : "debit-text"
            }
          >

            {item.type === "Credit"

              ? "+"

              : "-"}

            ₹{Number(item.amount).toLocaleString()}

          </strong>

        </div>

      ))

    )}

  </div>

</section>

    </div>
  );
}

export default Dashboard;