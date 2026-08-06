import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowDownCircle,
  FiArrowUpCircle
} from "react-icons/fi";

import "../css/Transactions.css";

function Transactions() {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    const all =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const userTransactions = all.filter(
      (item) => item.mobile === user.mobile
    );

    userTransactions.sort(
      (a, b) => b.id - a.id
    );

    setTransactions(userTransactions);

  }, []);

  return (

    <div className="transactions-page">

      <div className="transactions-header">

        <h1>Transaction History</h1>

        <p>
          View all your banking transactions
        </p>

      </div>

      {transactions.length === 0 ? (

        <div className="empty">

          <h2>No Transactions Found</h2>

          <p>
            Deposit or transfer money to see your history.
          </p>

        </div>

      ) : (

        transactions.map((item) => (

          <div
            key={item.id}
            className="transaction-card"
          >

            <div className="left">

              <div
                className={
                  item.type === "Credit"
                    ? "icon credit"
                    : "icon debit"
                }
              >

                {item.type === "Credit"
                  ? <FiArrowDownCircle />
                  : <FiArrowUpCircle />}

              </div>

              <div>

                <h3>{item.title}</h3>

                <p>

                  {item.type === "Credit"
                    ? item.remarks
                    : `To ${item.receiver}`}

                </p>

                <small>{item.date}</small>

              </div>

            </div>

            <div
              className={
                item.type === "Credit"
                  ? "amount credit-text"
                  : "amount debit-text"
              }
            >

              {item.type === "Credit" ? "+" : "-"}

              ₹{Number(item.amount).toLocaleString()}

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Transactions;