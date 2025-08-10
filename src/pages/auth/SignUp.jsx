import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { registerUser } from '../../services/api'; // API call placeholder
import "./AuthForm.css";

const SignUp = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Signing up with:", formData);
		// registerUser(formData).then(...)
	};

	return (
		<div className="auth-container">
			<div className="auth-form-wrapper">
				<h2 className="auth-title">Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="input-group">
						<input
							type="text"
							name="name"
							id="name"
							required
							onChange={handleChange}
							placeholder=" "
						/>
						<label htmlFor="name">Full Name</label>
					</div>
					<div className="input-group">
						<input
							type="email"
							name="email"
							id="email"
							required
							onChange={handleChange}
							placeholder=" "
						/>
						<label htmlFor="email">Email</label>
					</div>
					<div className="input-group">
						<input
							type="tel"
							name="phone"
							id="phone"
							required
							onChange={handleChange}
							placeholder=" "
						/>
						<label htmlFor="phone">Phone</label>
					</div>
					<div className="input-group">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							required
							onChange={handleChange}
							placeholder=" "
						/>
						<label htmlFor="password">Password</label>
						<span
							className="password-toggle-icon"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>
					<button type="submit" className="auth-button">
						Sign Up
					</button>
				</form>
				<div className="auth-separator">OR</div>
				<button className="google-signin-btn">
					<FcGoogle />
					Sign in with Google
				</button>
				<p className="auth-redirect">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
