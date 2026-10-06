import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleRegisterChange = (e) => {

        const { name, value } = e.target;

        setRegisterData({
            ...registerData,
            [name]: value
        });

    };


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(registerData)
                }
            );


            const result = await response.json();


            if (response.ok) {

                alert("Registration successful! Please login.");

                setRegisterData({
                    name: "",
                    email: "",
                    password: ""
                });

                navigate("/login");

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error("Registration error:", error);

            alert("Could not connect to the server.");

        }

    };


    return (

        <div className="auth-container">

            <h1>🐾 PetFinder Mini</h1>

            <h2>Create Account</h2>


            <form
                onSubmit={handleRegister}
                className="auth-form"
            >

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        placeholder="Enter your name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="Enter your email"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Create a password"
                        required
                    />

                </div>


                <button type="submit">
                    Register
                </button>

            </form>


            <p>

                Already have an account?{" "}

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

            </p>

        </div>

    );
}

export default Register;