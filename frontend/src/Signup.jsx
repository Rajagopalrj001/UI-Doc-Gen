import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://ui-doc-gen-backend.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            navigate("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="container auth-container d-flex justify-content-center align-items-center min-vh-100">
        <form onSubmit={handleSubmit} className="auth-form p-4 rounded shadow-lg">
          <h2 className="text-center mb-4">Signup</h2>
      
          {/* Username Input */}
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
      
          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
      
          {/* Signup Button */}
          <button type="submit" className="btn btn-danger w-100 btn-animate">
            Signup
          </button>
      
          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-danger text-decoration-none">
              Login
            </a>
          </p>
        </form>
      </div>
      
    );
}

export default Signup;
