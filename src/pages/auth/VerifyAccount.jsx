import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AuthForm.css";
import "./VerifyAccount.css";

const VerifyAccount = () => {
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const location = useLocation();
	const navigate = useNavigate();
	const email = location.state?.email;

	useEffect(() => {
		if (!email) {
			navigate("/login");
		}
	}, [email, navigate]);

	const handleOtpChange = (element, index) => {
		if (isNaN(element.value)) return false;
		setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
		if (element.nextSibling) {
			element.nextSibling.focus();
		}
	};

	const handleOtpSubmit = (e) => {
		e.preventDefault();
		const enteredOtp = otp.join("");

		if (enteredOtp === "123456") {
			toast.success("OTP Verified Successfully!");
		} else {
			toast.error("Invalid OTP. Please try again.");
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form-wrapper">
				<h2 className="auth-title">OTP verification</h2>
				<p className="auth-subtitle">An OTP has been sent to {email}</p>
				<form onSubmit={handleOtpSubmit}>
					<div className="otp-input-container">
						{otp.map((data, index) => (
							<input
								className="otp-input"
								type="text"
								maxLength="1"
								key={index}
								value={data}
								onChange={(e) => handleOtpChange(e.target, index)}
								onFocus={(e) => e.target.select()}
							/>
						))}
					</div>
					<button type="submit" className="auth-button">
						Submit
					</button>
					<button type="button" className="resend-otp-btn">
						RESEND OTP
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerifyAccount;
