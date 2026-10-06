import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });


    const handleLoginChange = (e) => {

        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value
        });

    };


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify(loginData)
                }
            );


            const result = await response.json();


            if (response.ok) {

                alert("Login successful! 🐾");

                navigate("/home");

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error("Login error:", error);

            alert("Could not connect to the server.");

        }

    };


    return (

        <div className="auth-container">

            <h1>🐾 PetFinder Mini</h1>

            <h2>Login</h2>


            <form
                onSubmit={handleLogin}
                className="auth-form"
            >

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        required
                    />

                </div>


                <button type="submit">
                    Login
                </button>

            </form>


            <p>

                Don't have an account?{" "}

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>

            </p>

        </div>

    );
}

export default Login;