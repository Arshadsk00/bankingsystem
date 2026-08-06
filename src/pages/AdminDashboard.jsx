import { useEffect, useState } from "react";
import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
FiEye,
FiCheck,
FiX
} from "react-icons/fi";

function AdminDashboard() {

  const [applications, setApplications] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  fetchApplications();
}, []);

useEffect(()=>{

    const admin =
        JSON.parse(localStorage.getItem("admin"));

    if(!admin){

        navigate("/admin-login");

    }

},[]);

const fetchApplications = async () => {
  try {
    const res = await axios.get("http://localhost:8082/users");
    setApplications(res.data);
  } catch (err) {
    console.log(err);
  }
};
 
  const total = applications.length;

const pending = applications.filter(
  (app) => app.status === "Pending"
).length;

const approved = applications.filter(
  (app) => app.status === "Approved"
).length;

const rejected = applications.filter(
  (app) => app.status === "Rejected"
).length;

const updateStatus = async (id, status) => {

  try {

    if (status === "Approved") {
      await axios.put(
        `http://localhost:8082/users/${id}/approve`
      );

    } else {
      await axios.put(
        `http://localhost:8082/users/${id}/reject`
      );
    }
    fetchApplications();
  } catch (err) {
    console.log(err);
  }
};


  const viewApplication = (id) => {

  const updated = applications.filter(
    (app) => app.id !== id
  );

  setApplications(updated);

  localStorage.setItem(
    "applications",
    JSON.stringify(updated)
  );

};
const logout=()=>{

localStorage.removeItem("admin");

navigate("/admin-login");

}
const [messages, setMessages] = useState([]);

useEffect(() => {

  const data =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

  setMessages(data);

}, []);


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

const resolveQuery = (id) => {

  const updated = messages.map((msg) =>

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

  return (

    <div className="page-content">

    <div className="admin-container">



            <div className="summary-cards">

  <div className="card total-card">
    <h3>Total Applications</h3>
    <h2>{total}</h2>
  </div>

  <div className="card pending-card">
    <h3>Pending</h3>
    <h2>{pending}</h2>
  </div>

  <div className="card approved-card">
    <h3>Approved</h3>
    <h2>{approved}</h2>
  </div>

  <div className="card rejected-card">
    <h3>Rejected</h3>
    <h2>{rejected}</h2>
  </div>

</div>
      <h1>SAFE BANK ADMIN PANEL</h1>
    
    <div className="table-card">

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

          {applications.map((app) => (

            <tr key={app.id}>

              <td>{app.id}</td>

              <td>{app.fullName}</td>

              <td>{app.accountNumber || "-"}</td>

              <td>${app.deposit}</td>

              <td>{app.status}</td>

              
                <td>
                    <span
                    className={`status ${
                    app.status==="Approved"
                    ? "status-approved"
                    : app.status==="Rejected"
                    ? "status-rejected"
                    : "status-pending"
                    }`}
                    >
                    {app.status}
                    </span>
                </td>
         <td className="action-buttons">

                    <button
className="view-btn"
onClick={()=>
navigate("/view-application",{state:app})
}
>

<FiEye/>

</button>

<button
className="approve-btn"
onClick={()=>
updateStatus(app.id,"Approved")
}
>

<FiCheck/>

</button>

<button
className="reject-btn"
onClick={()=>
updateStatus(app.id,"Rejected")
}
>

<FiX/>

</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
      </div>

    </div>

    <h2>Customer Queries</h2>

<table>

<thead>

<tr>

<th>Name</th>

<th>Subject</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{messages.map((item) => (

<tr key={item.id}>

<td>{item.name}</td>

<td>{item.subject}</td>

<td>{item.date}</td>

<td>{item.status}</td>

<td>

<button
onClick={() => viewMessage(item)}
>
View
</button>

<button
onClick={() => resolveQuery(item.id)}
>
Resolved
</button>



</td>

</tr>

))}

</tbody>

</table>
<button onClick={logout}>
Logout
</button>
</div>


  );

}

export default AdminDashboard;