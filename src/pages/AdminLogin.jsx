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

            console.log("Admin login started");

            const res = await axios.post(
                "http://localhost:8082/admin/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("Admin login response:", res.data);

            // ==============================
            // LOGIN SUCCESS
            // ==============================

            if (
                res.data &&
                res.data.token
            ) {

                // Save JWT token
                localStorage.setItem(
                    "token",
                    res.data.token
                );

                // Save admin information
                localStorage.setItem(
                    "admin",
                    JSON.stringify(res.data)
                );

                // Save role
                localStorage.setItem(
                    "adminRole",
                    res.data.role || "ADMIN"
                );

                console.log(
                    "Admin token saved"
                );

                console.log(
                    "Admin role:",
                    res.data.role
                );

                // Go to admin dashboard
                navigate("/admin-dashboard");

            } else {

                setError(
                    "Invalid Email or Password"
                );

            }

        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );

            // Show backend error if available
            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend response:",
                    error.response.data
                );

            }

            setError(
                error.response?.data ||
                "Login Failed"
            );
        }
    };


    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-icon">
                    🏦
                </div>

                <h1>
                    SAFE BANK
                </h1>

                <h2>
                    Admin Login
                </h2>


                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    {/* PASSWORD */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {/* ERROR */}

                    {error && (

                        <p className="error">
                            {error}
                        </p>

                    )}


                    {/* LOGIN */}

                    <button type="submit">
                        Login
                    </button>


                    {/* BACK */}

                    <button
                        type="button"
                        className="back-home-btn"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        ← Back to Home
                    </button>

                </form>

            </div>

        </div>

    );
}

export default AdminLogin;