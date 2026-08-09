import { useEffect, useState } from "react";
import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiEye,
  FiCheck,
  FiX,
  FiLogOut,
  FiMessageSquare
} from "react-icons/fi";

function AdminDashboard() {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK ADMIN LOGIN
  // =====================================================

  useEffect(() => {

    const admin =
      JSON.parse(localStorage.getItem("admin"));

    if (!admin) {
      navigate("/admin-login");
      return;
    }

    fetchApplications();
    loadMessages();

  }, [navigate]);


  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  const fetchApplications = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8082/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(response.data);

    } catch (error) {

      console.error(
        "Error loading applications:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD CUSTOMER QUERIES
  // =====================================================

  const loadMessages = () => {

    const data =
      JSON.parse(
        localStorage.getItem("contactMessages")
      ) || [];

    setMessages(data);

  };


  // =====================================================
  // COUNTS
  // =====================================================

  const total =
    applications.length;

  const pending =
    applications.filter(
      app => app.status === "Pending"
    ).length;

  const approved =
    applications.filter(
      app => app.status === "Approved"
    ).length;

  const rejected =
    applications.filter(
      app => app.status === "Rejected"
    ).length;


  // =====================================================
  // APPROVE / REJECT
  // =====================================================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      if (status === "Approved") {

        await axios.put(
          `http://localhost:8082/users/${id}/approve`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      } else {

        await axios.put(
          `http://localhost:8082/users/${id}/reject`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      }

      await fetchApplications();

      alert(
        `Application ${status}`
      );

    } catch (error) {

      console.error(
        "Status update error:",
        error
      );

      alert(
        "Failed to update application status."
      );

    }

  };


  // =====================================================
  // VIEW APPLICATION
  // =====================================================

  const viewApplication = (application) => {

    navigate(
      "/view-application",
      {
        state: application
      }
    );

  };


  // =====================================================
  // VIEW CUSTOMER MESSAGE
  // =====================================================

  const viewMessage = (item) => {

    alert(
      `Name : ${item.name}

Mobile : ${item.mobile}

Email : ${item.email}

Subject : ${item.subject}

Message :

${item.message}`
    );

  };


  // =====================================================
  // RESOLVE QUERY
  // =====================================================

  const resolveQuery = (id) => {

    const updated =
      messages.map(
        msg =>
          msg.id === id
            ? {
                ...msg,
                status: "Resolved"
              }
            : msg
      );

    setMessages(updated);

    localStorage.setItem(
      "contactMessages",
      JSON.stringify(updated)
    );

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {

    localStorage.removeItem("admin");

    navigate("/admin-login");

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="admin-loading">

        <h2>
          Loading Admin Dashboard...
        </h2>

      </div>
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="page-content">

      <div className="admin-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="admin-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage customer applications and requests
            </p>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >

            <FiLogOut />

            Logout

          </button>

        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="summary-cards">


          <div className="summary-card">

            <h3>
              Total Applications
            </h3>

            <h2>
              {total}
            </h2>

          </div>


          <div className="summary-card">

            <h3>
              Pending
            </h3>

            <h2>
              {pending}
            </h2>

          </div>


          <div className="summary-card">

            <h3>
              Approved
            </h3>

            <h2>
              {approved}
            </h2>

          </div>


          <div className="summary-card">

            <h3>
              Rejected
            </h3>

            <h2>
              {rejected}
            </h2>

          </div>

        </div>


        {/* =================================================
            CUSTOMER APPLICATIONS
        ================================================= */}

        <div className="table-card">

          <div className="section-title">

            <h2>
              Customer Applications
            </h2>

          </div>


          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Account No</th>
                <th>Deposit</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {applications.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    No applications found.

                  </td>

                </tr>

              ) : (

                applications.map(
                  (app) => (

                    <tr
                      key={app.id}
                    >

                      <td>
                        {app.id}
                      </td>


                      <td>
                        {app.fullName}
                      </td>


                      <td>
                        {app.accountNumber || "-"}
                      </td>


                      <td>
                        ₹{app.deposit || 0}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            `status ${
                              app.status === "Approved"
                                ? "status-approved"
                                : app.status === "Rejected"
                                ? "status-rejected"
                                : "status-pending"
                            }`
                          }
                        >

                          {app.status || "Pending"}

                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="action-buttons">


                        {/* VIEW */}

                        <button
                          className="view-btn"
                          onClick={() =>
                            viewApplication(app)
                          }
                          title="View Application"
                        >

                          <FiEye />

                        </button>


                        {/* APPROVE */}

                        <button
                          className="approve-btn"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Approved"
                            )
                          }
                          disabled={
                            app.status === "Approved"
                          }
                          title="Approve"
                        >

                          <FiCheck />

                        </button>


                        {/* REJECT */}

                        <button
                          className="reject-btn"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Rejected"
                            )
                          }
                          disabled={
                            app.status === "Rejected"
                          }
                          title="Reject"
                        >

                          <FiX />

                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            CUSTOMER QUERIES
        ================================================= */}

        <div className="messages-section">

          <div className="section-title">

            <h2>

              <FiMessageSquare />

              Customer Queries

            </h2>

          </div>


          {messages.length === 0 ? (

            <div className="no-messages">

              <p>
                No customer queries.
              </p>

            </div>

          ) : (

            <div className="messages-list">

              {messages.map(
                (item) => (

                  <div
                    className="message-card"
                    key={item.id}
                  >

                    <div>

                      <h3>
                        {item.subject}
                      </h3>

                      <p>
                        From: {item.name}
                      </p>

                      <p>
                        Email: {item.email}
                      </p>


                      <span
                        className={
                          item.status === "Resolved"
                            ? "status status-approved"
                            : "status status-pending"
                        }
                      >

                        {item.status || "Pending"}

                      </span>

                    </div>


                    <div className="message-actions">


                      {/* VIEW */}

                      <button
                        className="view-btn"
                        onClick={() =>
                          viewMessage(item)
                        }
                      >

                        <FiEye />

                        View

                      </button>


                      {/* RESOLVE */}

                      {item.status !== "Resolved" && (

                        <button
                          className="approve-btn"
                          onClick={() =>
                            resolveQuery(item.id)
                          }
                        >

                          <FiCheck />

                          Resolved

                        </button>

                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;