import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalStateContext";
import { navItems } from "../../data/navigation";
import allCountries from "../../data/countries";
import {
	FaTimes,
	FaAngleDown,
	FaMapMarkerAlt,
	FaTshirt,
	FaLaptop,
	FaShoppingBag,
	FaShoePrints,
	FaAppleAlt,
	FaMagic,
} from "react-icons/fa";
import "./MobileSidebar.css";

const categoryIcons = {
	Fashion: <FaTshirt />,
	Electronics: <FaLaptop />,
	Bags: <FaShoppingBag />,
	Footwear: <FaShoePrints />,
	Groceries: <FaAppleAlt />,
	Beauty: <FaMagic />,
};

const MobileSidebar = ({ isOpen, toggleSidebar }) => {
	const { isAuthenticated, logout } = useGlobalState();
	const [openDropdown, setOpenDropdown] = useState(null);

	const [isLocationOpen, setIsLocationOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState("All");
	const [locationSearchTerm, setLocationSearchTerm] = useState("");

	const handleLogout = () => {
		toggleSidebar();
		logout();
	};

	const handleDropdownClick = (label) => {
		setOpenDropdown(openDropdown === label ? null : label);
	};

	const filteredCountries = allCountries.filter((country) =>
		country.label.toLowerCase().includes(locationSearchTerm.toLowerCase())
	);

	const handleCountrySelect = (countryLabel) => {
		setSelectedCountry(countryLabel);
		setIsLocationOpen(false);
		setLocationSearchTerm("");
	};

	return (
		<>
			<div
				className={`sidebar-overlay ${isOpen ? "open" : ""}`}
				onClick={toggleSidebar}
			></div>
			<aside className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
				<div className="sidebar-header">
					<img src="/Shopstic_Logo.png" alt="logo" className="sidebar-logo" />
				</div>
				<div className="sidebar-content">
					<div className="sidebar-location-container">
						<div
							className="sidebar-location-selector"
							onClick={() => setIsLocationOpen(!isLocationOpen)}
						>
							<FaMapMarkerAlt />
							<span>{selectedCountry}</span>
							<FaAngleDown
								className={`dropdown-arrow ${isLocationOpen ? "open" : ""}`}
							/>
						</div>
						{isLocationOpen && (
							<div className="location-dropdown-mobile">
								<input
									type="text"
									placeholder="Search country..."
									value={locationSearchTerm}
									onChange={(e) => setLocationSearchTerm(e.target.value)}
								/>
								<ul>
									{filteredCountries.map((country) => (
										<li
											key={country.label}
											onClick={() => handleCountrySelect(country.label)}
										>
											{country.label}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<nav className="sidebar-nav">
						{navItems
							.filter((item) => item.label !== "Home" && item.label !== "Shop")
							.map((item) => (
								<div key={item.label} className="nav-item">
									<div
										className="nav-item-header"
										onClick={() =>
											item.dropdown
												? handleDropdownClick(item.label)
												: toggleSidebar()
										}
									>
										{item.dropdown ? (
											<>
												<div className="nav-item-title">
													{categoryIcons[item.label]}
													<span>{item.label}</span>
												</div>
												<FaAngleDown
													className={`dropdown-arrow ${
														openDropdown === item.label ? "open" : ""
													}`}
												/>
											</>
										) : (
											<Link to={item.link || "#"} className="nav-item-title">
												{categoryIcons[item.label]}
												<span>{item.label}</span>
											</Link>
										)}
									</div>
									{item.dropdown && (
										<div
											className={`dropdown-content ${
												openDropdown === item.label ? "open" : ""
											}`}
										>
											<ul>
												{item.dropdown.map((subItem) => (
													<li key={subItem}>
														<Link to="#" onClick={toggleSidebar}>
															{subItem}
														</Link>
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							))}
					</nav>
					<div className="sidebar-actions">
						{isAuthenticated ? (
							<button onClick={handleLogout} className="sidebar-auth-button">
								Logout
							</button>
						) : (
							<Link
								to="/login"
								onClick={toggleSidebar}
								className="sidebar-auth-button"
							>
								Login
							</Link>
						)}
					</div>
				</div>
			</aside>
		</>
	);
};

export default MobileSidebar;
