import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiSave,
  FiLogOut,
  FiLock,
  FiPhone,
  FiMail,
  FiMapPin
} from "react-icons/fi";

import "../css/Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [mobile,setMobile]=useState("");
  const [email,setEmail]=useState("");
  const [address,setAddress]=useState("");

  const [currentPin,setCurrentPin]=useState("");
  const [newPin,setNewPin]=useState("");
  const [confirmPin,setConfirmPin]=useState("");

  useEffect(()=>{

    const loggedUser=
      JSON.parse(localStorage.getItem("loggedInUser"));

    if(!loggedUser){
      navigate("/login");
      return;
    }

    setUser(loggedUser);

    setMobile(loggedUser.mobile||"");
    setEmail(loggedUser.email||"");
    setAddress(loggedUser.address||"");

  },[]);

  if(!user) return null;

  const saveProfile=()=>{

    const applications=
      JSON.parse(localStorage.getItem("applications"))||[];

    const updated=applications.map(app=>

      app.id===user.id

      ?{
          ...app,
          mobile,
          email,
          address
       }

      :app

    );

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    const updatedUser=
      updated.find(app=>app.id===user.id);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    alert("Profile Updated Successfully");
  };

  const changePin=()=>{

    if(currentPin!==user.pin){
      alert("Current PIN Incorrect");
      return;
    }

    if(newPin.length!==4){
      alert("PIN must be 4 digits");
      return;
    }

    if(newPin!==confirmPin){
      alert("PINs do not match");
      return;
    }

    const applications=
      JSON.parse(localStorage.getItem("applications"))||[];

    const updated=applications.map(app=>

      app.id===user.id

      ?{
          ...app,
          pin:newPin
       }

      :app

    );

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    const updatedUser=
      updated.find(app=>app.id===user.id);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");

    alert("PIN Changed Successfully");

  };

  const logout=()=>{

    localStorage.removeItem("loggedInUser");

    navigate("/");

  };

  return(

<div className="profile-page">

<div className="profile-card">

<div className="profile-header">

<div className="avatar">
👤
</div>

<h2>{user.fullName}</h2>

<p>{user.accountType} Account</p>

<span className="verified">
✔ Verified Customer
</span>

</div>

<div className="section">

<h3>Personal Details</h3>

<div className="info-grid">

<div>
<label>Full Name</label>
<input value={user.fullName} readOnly/>
</div>

<div>
<label>Father Name</label>
<input value={user.fatherName} readOnly/>
</div>

<div>
<label>DOB</label>
<input value={user.dob} readOnly/>
</div>

<div>
<label>Gender</label>
<input value={user.gender} readOnly/>
</div>

<div>
<label>Aadhaar</label>
<input value={user.aadhaar} readOnly/>
</div>

<div>
<label>PAN</label>
<input value={user.pan} readOnly/>
</div>

</div>

</div>

<div className="section">

<h3>Contact Details</h3>

<label>
<FiPhone/>
Mobile
</label>

<input
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
/>

<label>
<FiMail/>
Email
</label>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label>
<FiMapPin/>
Address
</label>

<textarea
rows="3"
value={address}
onChange={(e)=>setAddress(e.target.value)}
></textarea>

<button
className="save-btn"
onClick={saveProfile}
>

<FiSave/>

Save Changes

</button>

</div>

<div className="section">

<h3>Security</h3>

<input
type="password"
placeholder="Current PIN"
value={currentPin}
maxLength={4}
onChange={(e)=>setCurrentPin(e.target.value)}
/>

<input
type="password"
placeholder="New PIN"
value={newPin}
maxLength={4}
onChange={(e)=>setNewPin(e.target.value)}
/>

<input
type="password"
placeholder="Confirm PIN"
value={confirmPin}
maxLength={4}
onChange={(e)=>setConfirmPin(e.target.value)}
/>

<button
className="pin-btn"
onClick={changePin}
>

<FiLock/>

Change PIN

</button>

</div>

<div className="section">

<h3>Account Information</h3>

<div className="account-box">

<p><b>Account Number</b></p>

<h2>
XXXX XXXX {String(user.mobile).slice(-4)}
</h2>

<p><b>Balance</b></p>

<h1>
₹{Number(user.deposit).toLocaleString()}
</h1>

</div>

</div>

<button
className="logout-btn"
onClick={logout}
>

<FiLogOut/>

Logout

</button>

</div>

</div>

);

}

export default Profile;