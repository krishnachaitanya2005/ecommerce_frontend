import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Account from "./pages/user/Account";
import Orders from "./pages/user/Orders";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BottomNav from "./components/common/BottomNav";
import VerifyAccount from "./pages/auth/VerifyAccount";
import SearchModal from "./components/common/SearchModal";

function App() {
	return (
		<div className="app">
			<ToastContainer
				position="bottom-left"
				autoClose={3000}
				hideProgressBar
				theme="colored"
			/>
			<Header />
			<SearchModal /> 
			<main className="main-content">
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products/:category" element={<ProductListing />} />
						<Route path="/product/:id" element={<ProductDetail />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/verify-account" element={<VerifyAccount />} />
						<Route
							path="/cart"
							element={
								<ProtectedRoute>
									<Cart />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/my-wishlist"
							element={
								<ProtectedRoute>
									<Wishlist />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/my-account"
							element={
								<ProtectedRoute>
									<Account />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/my-orders"
							element={
								<ProtectedRoute>
									<Orders />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/checkout"
							element={
								<ProtectedRoute>
									<Checkout />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</main>
			<Footer />
			<BottomNav />
		</div>
	);
}

export default App;
