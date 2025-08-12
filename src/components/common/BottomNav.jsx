import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
	FaHome,
	FaThList,
	FaSearch,
	FaHeart,
	FaUser,
	FaBoxOpen,
} from "react-icons/fa";
import { useGlobalState } from "../../context/GlobalStateContext";
import "./BottomNav.css";

import "./BottomNav.css";

const BottomNav = () => {
	const { toggleFilterSidebar, toggleSearchModal } = useGlobalState();
	const location = useLocation();
	if (location.pathname.startsWith("/admin")) {
		return null;
	}

	const isProductListingPage = location.pathname.startsWith("/products/");
	return (
		<nav className="bottom-nav">
			<NavLink to="/" className="bottom-nav-link" end>
				<FaHome />
				<span>Home</span>
			</NavLink>
			{isProductListingPage && (
				<button className="bottom-nav-link" onClick={toggleFilterSidebar}>
					<FaThList />
					<span>Filters</span>
				</button>
			)}
			<button className="bottom-nav-link" onClick={toggleSearchModal}>
				<FaSearch />
				<span>Search</span>
			</button>
			<NavLink to="/my-wishlist" className="bottom-nav-link">
				<FaHeart />
				<span>Wishlist</span>
			</NavLink>
			<NavLink to="/my-orders" className="bottom-nav-link">
				<FaBoxOpen />
				<span>Orders</span>
			</NavLink>
			<NavLink to="/my-account" className="bottom-nav-link">
				<FaUser />
				<span>Account</span>
			</NavLink>
		</nav>
	);
};

export default BottomNav;
