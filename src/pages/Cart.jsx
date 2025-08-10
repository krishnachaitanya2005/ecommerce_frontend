import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaStar, FaRegStar } from "react-icons/fa";
import Button from "../components/ui/Button";
import { useGlobalState } from "../context/GlobalStateContext";
import "./Cart.css";

const Cart = () => {
	const { cartItems, removeFromCart, updateCartQuantity } = useGlobalState();
	const navigate = useNavigate();

	const [subtotal, setSubtotal] = useState(0);
	const shipping = 0;

	useEffect(() => {
		const total = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setSubtotal(total);
	}, [cartItems]);
	const renderStars = (rating) => {
		const totalStars = 5;
		const stars = [];
		for (let i = 1; i <= totalStars; i++) {
			stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
		}
		return stars;
	};
	if (cartItems.length === 0) {
		return (
			<div className="empty-state-container container">
				<div className="empty-state-icon">🛒</div>
				<h2>Your Cart is currently empty</h2>
				<Link to="/" className="continue-shopping-btn">
					Continue Shopping
				</Link>
			</div>
		);
	}

	return (
		<div className="cart-page container">
			<h1 className="page-title">Your Cart</h1>
			<p>There are {cartItems.length} products in your cart</p>

			<div className="cart-layout">
				<div className="cart-items-list">
					<div className="cart-header">
						<div className="header-product">Product</div>
						<div className="header-price">Unit Price</div>
						<div className="header-quantity">Quantity</div>
						<div className="header-subtotal">Subtotal</div>
						<div className="header-remove">Remove</div>
					</div>
					{cartItems.map((item) => (
						<div key={item.id} className="cart-item">
							<div className="item-product">
								<img
									src={item.image || "https://via.placeholder.com/100"}
									alt={item.name}
								/>
								<div className="product-details">
									<Link to={`/product/${item.id}`}>
										<p className="product-name">{item.name}</p>
									</Link>
									{item.rating && (
										<div className="product-rating">
											<div className="star-display">
												{renderStars(item.rating)}
											</div>
											<span>({item.reviews})</span>
										</div>
									)}
								</div>
							</div>
							<div className="item-price">Rs. {item.price}</div>
							<div className="item-quantity">
								<div className="quantity-selector">
									<button onClick={() => updateCartQuantity(item.id, -1)}>
										−
									</button>
									<span>{item.quantity}</span>
									<button onClick={() => updateCartQuantity(item.id, 1)}>
										+
									</button>
								</div>
							</div>
							<div className="item-subtotal">
								Rs. {item.price * item.quantity}
							</div>
							<div className="item-remove">
								<FaTrashAlt
									className="remove-icon"
									onClick={() => removeFromCart(item.id)}
								/>
							</div>
						</div>
					))}
					<Link to="/" className="continue-shopping-btn">
						← Continue Shopping
					</Link>
				</div>

				<aside className="order-summary">
					<h4>Order Summary</h4>
					<div className="summary-row">
						<span>Subtotal</span>
						<span>Rs. {subtotal.toFixed(2)}</span>
					</div>
					<div className="summary-row">
						<span>Shipping</span>
						<span>
							{shipping === 0 ? "Free" : `Rs. ${shipping.toFixed(2)}`}
						</span>
					</div>
					<div className="summary-total">
						<span>Total</span>
						<span>Rs. {(subtotal + shipping).toFixed(2)}</span>
					</div>
					<Button variant="primary" onClick={() => navigate("/checkout")}>
						Proceed To Checkout
					</Button>
				</aside>
			</div>
		</div>
	);
};

export default Cart;
