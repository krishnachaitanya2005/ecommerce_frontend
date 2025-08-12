import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import {
	FaMapMarkerAlt,
	FaHeart,
	FaShoppingCart,
	FaUser,
	FaAngleDown,
	FaSearch,
	FaSignOutAlt,
	FaBoxOpen,
	FaRegHeart,
	FaHeadphones,
	FaBars,
} from "react-icons/fa";
import { useGlobalState } from "../../context/GlobalStateContext";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import allCountries from "../../data/countries";
import { allProducts } from "../../data/allProducts";
import MobileSidebar from "./MobileSidebar";
import "./Header.css";

const Header = () => {
	const { isAuthenticated, logout, cartItems, wishlistItems } =
		useGlobalState();
	const navigate = useNavigate();
	const location = useLocation();

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const [isScrolled, setIsScrolled] = useState(false);
	const [isLocationOpen, setIsLocationOpen] = useState(false);
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState("All");
	const [locationSearchTerm, setLocationSearchTerm] = useState("");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [hoveredItem, setHoveredItem] = useState(null);

	if (location.pathname.startsWith("/admin")) {
		return null;
	}

	const searchRef = useRef(null);
	useOnClickOutside(searchRef, () => setSearchResults([]));

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setSearchResults([]);
			return;
		}

		const filtered = allProducts.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setSearchResults(filtered);
	}, [searchQuery]);

	const handleResultClick = () => {
		setSearchQuery("");
		setSearchResults([]);
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const locationRef = useRef();
	const accountRef = useRef();
	useOnClickOutside(locationRef, () => setIsLocationOpen(false));
	useOnClickOutside(accountRef, () => setIsAccountOpen(false));

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	const navItems = [
		{ label: "Home", link: "/" },
		{ label: "Fashion", link: "/products/fashion", dropdown: ["Men", "Women"] },
		{
			label: "Electronics",
			link: "/products/electronics",
			dropdown: ["Laptops", "Mobiles", "Cameras", "Headphones"],
		},
		{
			label: "Bags",
			link: "/products/bags",
			dropdown: ["Mens Bags", "Womens Bags"],
		},
		{
			label: "Footwear",
			link: "/products/footwear",
			dropdown: ["Mens Footwear", "Womens Footwear"],
		},
		{ label: "Groceries", link: "/products/groceries" },
		{ label: "Beauty", link: "/products/beauty" },
		{ label: "Shop", link: "/products", dropdown: ["By Brand", "By Category"] },
	];

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 180) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
			<MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<header className={`header ${isScrolled ? "scrolled" : ""}`}>
				<div className="header-top">
					<div className="header-container">
						<div className="hamburger-menu" onClick={toggleSidebar}>
							<FaBars />
						</div>
						<Link to="/">
							<img
								src="/Shopstic_Logo.png"
								alt="logo"
								to="/"
								className="logo"
								style={{ width: "125px", height: "27px" }}
							/>
						</Link>
						<div className="search-bar" ref={searchRef}>
							<input
								type="text"
								placeholder="Search for items..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<FaSearch className="search-icon" />

							{searchResults.length > 0 && (
								<div className="search-results-dropdown">
									<ul>
										{searchResults.map((product) => (
											<li key={product.id}>
												<Link
													to={`/product/${product.id}`}
													className="search-result-item"
													onClick={handleResultClick}
												>
													<img src={product.images[0].url} alt={product.name} />
													<span>{product.name}</span>
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
						<div className="header-actions">
							<Link to="/cart" className="action-item cart-mobile">
								<div className="action-icon-wrapper">
									<FaShoppingCart />
									{cartItems.length > 0 && (
										<span className="item-badge">{cartItems.length}</span>
									)}
								</div>
							</Link>
							<div className="header-actions-desktop">
								<div ref={locationRef} className="action-item-wrapper">
									<div
										className="action-item location-selector"
										onClick={() => setIsLocationOpen(!isLocationOpen)}
									>
										<FaMapMarkerAlt />
										<span>{selectedCountry}</span>
										<FaAngleDown
											className={`dropdown-arrow ${
												isLocationOpen ? "open" : ""
											}`}
										/>
									</div>
									{isLocationOpen && (
										<div className="dropdown-menu location-dropdown">
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
								<Link to="/my-wishlist" className="action-item">
									<div className="action-icon-wrapper">
										<FaHeart />
										{wishlistItems.length > 0 && (
											<span className="item-badge">{wishlistItems.length}</span>
										)}
									</div>
									<span>Wishlist</span>
								</Link>
								<Link to="/cart" className="action-item">
									<div className="action-icon-wrapper">
										<FaShoppingCart />
										{cartItems.length > 0 && (
											<span className="item-badge">{cartItems.length}</span>
										)}
									</div>
									<span>Cart</span>
								</Link>
								{isAuthenticated ? (
									<div ref={accountRef} className="action-item-wrapper">
										<div
											className="action-item"
											onClick={() => setIsAccountOpen(!isAccountOpen)}
										>
											<FaUser /> <span>Account</span>
											<FaAngleDown
												className={`dropdown-arrow ${
													isAccountOpen ? "open" : ""
												}`}
											/>
										</div>
										{isAccountOpen && (
											<div className="dropdown-menu account-dropdown">
												<ul>
													<li>
														<Link to="/my-account">
															<FaUser /> My Account
														</Link>
													</li>
													<li>
														<Link to="/my-orders">
															<FaBoxOpen /> Orders
														</Link>
													</li>
													<li>
														<Link to="/my-wishlist">
															<FaRegHeart /> My Wishlist
														</Link>
													</li>
													<li>
														<button
															onClick={handleLogout}
															className="logout-button"
														>
															<FaSignOutAlt /> Sign Out
														</button>
													</li>
												</ul>
											</div>
										)}
									</div>
								) : (
									<Link to="/login" className="action-item login-button">
										<FaUser />
										<span>Login</span>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="header-bottom">
					<div className="header-container">
						<nav className="category-nav">
							<ul>
								{navItems.map((item) => (
									<li
										key={item.label}
										onMouseEnter={() => setHoveredItem(item.label)}
										onMouseLeave={() => setHoveredItem(null)}
									>
										<Link to={item.link || "#"}>
											{item.label}
											{item.dropdown && (
												<FaAngleDown className="dropdown-arrow-cat" />
											)}
										</Link>
										{item.label === "Shop" ? (
											<div
												className="category-dropdown mega-menu"
												style={{
													display: hoveredItem === "Shop" ? "flex" : "none",
												}}
											>
												{navItems
													.filter(
														(navItem) =>
															navItem.label !== "Home" &&
															navItem.label !== "Shop"
													)
													.map((categoryItem) => (
														<div
															key={categoryItem.label}
															className="mega-menu-column"
														>
															<Link
																to={categoryItem.link}
																className="mega-menu-heading"
															>
																{categoryItem.label}
															</Link>
															{categoryItem.dropdown && (
																<ul>
																	{categoryItem.dropdown.map((subItem) => (
																		<li key={subItem}>
																			<Link to="#">{subItem}</Link>
																		</li>
																	))}
																</ul>
															)}
														</div>
													))}
											</div>
										) : (
											item.dropdown && (
												<ul
													className="category-dropdown"
													style={{
														display:
															hoveredItem === item.label ? "block" : "none",
													}}
												>
													{item.dropdown.map((subItem) => (
														<li key={subItem}>
															<Link to="#">{subItem}</Link>
														</li>
													))}
												</ul>
											)
										)}
									</li>
								))}
							</ul>
						</nav>
						<div className="support-info">
							<FaHeadphones className="support-icon" />
							<div className="support-text-content">
								<span className="support-number">1900 - 888</span>
								<p>24/7 Support Center</p>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
