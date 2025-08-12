import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalStateContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./AuthForm.css";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useGlobalState();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const fakeToken = "12345abcdef-fake-token";

			login(fakeToken);
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};
	const handleForgotPasswordClick = () => {
		if (!formData.email) {
			toast.error("Please enter your email address to reset your password.");
			return;
		}
		console.log(`Sending OTP to ${formData.email}`);
		navigate("/verify-account", { state: { email: formData.email } });
	};
	return (
		<div className="auth-container">
			<div className="auth-form-wrapper">
				<h2 className="auth-title">Sign In</h2>
				<form onSubmit={handleSubmit}>
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
					<span
						to="/forgot-password"
						className="forgot-password"
						onClick={handleForgotPasswordClick}
					>
						Forgot Password?
					</span>
					<button type="submit" className="auth-button">
						Sign In
					</button>
				</form>
				<div className="auth-separator">OR</div>
				<button className="google-signin-btn">
					<FcGoogle />
					Sign in with Google
				</button>
				<p className="auth-redirect">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
