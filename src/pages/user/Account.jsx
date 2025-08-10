import React, { useState } from "react";
import Button from "../../components/ui/Button";
import "./Account.css";

const Account = () => {
	const [activeTab, setActiveTab] = useState("profile");

	// Mock user data
	const [profile, setProfile] = useState({
		name: "sample",
		email: "sample@gmail.com",
		phone: "1234567890",
	});

	const handleProfileChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const handleProfileSubmit = (e) => {
		e.preventDefault();
		alert("Profile saved!");
	};

	const handleChangePasswordSubmit = (e) => {
		e.preventDefault();
		alert("Password change submitted!");
	};

	return (
		<div className="account-page">
			<h1 className="page-title">My Account</h1>
			<div className="account-tabs">
				<button
					onClick={() => setActiveTab("profile")}
					className={activeTab === "profile" ? "active" : ""}
				>
					Edit Profile
				</button>
				<button
					onClick={() => setActiveTab("password")}
					className={activeTab === "password" ? "active" : ""}
				>
					Change Password
				</button>
			</div>

			<div className="account-content">
				{activeTab === "profile" && (
					<form className="profile-form" onSubmit={handleProfileSubmit}>
						<div className="profile-picture-section">
							<div className="profile-picture-placeholder">
								<span>No photo</span>
							</div>
						</div>
						<div className="profile-fields">
							<div className="input-group">
								<input
									type="text"
									id="name"
									name="name"
									value={profile.name}
									onChange={handleProfileChange}
									placeholder=" "
									required
								/>
								<label htmlFor="name">Name</label>
							</div>
							<div className="input-group">
								<input
									type="email"
									id="email"
									name="email"
									value={profile.email}
									onChange={handleProfileChange}
									placeholder=" "
									readOnly
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-group">
								<input
									type="tel"
									id="phone"
									name="phone"
									value={profile.phone}
									onChange={handleProfileChange}
									placeholder=" "
									required
								/>
								<label htmlFor="phone">Phone</label>
							</div>
							<div className="form-actions">
								<Button type="submit">Save</Button>
							</div>
						</div>
					</form>
				)}
				{activeTab === "password" && (
					<form className="password-form" onSubmit={handleChangePasswordSubmit}>
						<div className="password-form-grid">
							<div className="input-group">
								<input
									type="password"
									id="currentPassword"
									name="currentPassword"
									placeholder=" "
									required
								/>
								<label htmlFor="currentPassword">Old Password</label>
							</div>
							<div className="input-group">
								<input
									type="password"
									id="newPassword"
									name="newPassword"
									placeholder=" "
									required
								/>
								<label htmlFor="newPassword">New password</label>
							</div>
							<div className="input-group">
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									placeholder=" "
									required
								/>
								<label htmlFor="confirmPassword">Confirm Password</label>
							</div>
						</div>
						<div className="form-actions">
							<Button type="submit">Save</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default Account;
