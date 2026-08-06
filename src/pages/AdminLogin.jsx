import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const res = await axios.post(
                "http://localhost:8082/admin/login",
                {
                    email,
                    password,
                }
            );

            if (res.data.role === "ADMIN") {

                localStorage.setItem(
                    "admin",
                    JSON.stringify(res.data)
                );

                navigate("/admin-dashboard");

            } else {

                setError("Invalid Email or Password");

            }

        } catch {

            setError("Login Failed");

        }

    };

    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-icon">
                    🏦
                </div>

                <h1>SAFE BANK</h1>

                <h2>Admin Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />

                    {error &&

                        <p className="error">
                            {error}
                        </p>

                    }

                    <button type="submit"> Login</button>
                   
                    <button
    type="button"
    className="back-home-btn"
    onClick={() => navigate("/")}
>
    ← Back to Home
</button>
                  
                </form>
  <div className="admin-footer">
    <p>🔒 Secure Admin Portal</p>
    <p>
        Authorized Personnel Only
        <br />
        SAFE BANK Management System
    </p>
</div>
            </div>
            


        </div>

    );

}

export default AdminLogin;