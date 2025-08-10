import React, { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import Button from "../components/ui/Button";
import "./Checkout.css";

const Checkout = () => {
	const { cartItems } = useGlobalState();
	const [subtotal, setSubtotal] = useState(0);

	useEffect(() => {
		const total = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setSubtotal(total);
	}, [cartItems]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission and payment gateway logic here
		alert("Placing order...");
	};

	return (
		<div className="checkout-page">
			<form className="billing-details-form" onSubmit={handleSubmit}>
				<h2 className="section-title">Billing Details</h2>
				<div className="form-grid">
					<div className="input-group">
						<label htmlFor="fullName">Full Name *</label>
						<input type="text" id="fullName" name="fullName" required />
					</div>
					<div className="input-group">
						<label htmlFor="country">Country *</label>
						<input type="text" id="country" name="country" required />
					</div>
				</div>
				<div className="input-group">
					<input
						type="text"
						id="streetAddress"
						name="streetAddress"
						placeholder="House number and street name *"
						required
					/>
					<input
						type="text"
						id="apartment"
						name="apartment"
						placeholder="Apartment, suite, unit, etc. (optional)"
						style={{ marginTop: "10px" }}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="city">Town / City *</label>
					<input type="text" id="city" name="city" required />
				</div>
				<div className="input-group">
					<label htmlFor="state">State / County *</label>
					<input type="text" id="state" name="state" required />
				</div>
				<div className="input-group">
					<label htmlFor="zip">Postcode / ZIP *</label>
					<input type="text" id="zip" name="zip" required />
				</div>
				<div className="form-grid">
					<div className="input-group">
						<label htmlFor="phone">Phone Number</label>
						<input type="tel" id="phone" name="phone" />
					</div>
					<div className="input-group">
						<label htmlFor="email">Email Address</label>
						<input type="email" id="email" name="email" />
					</div>
				</div>
			</form>

			<aside className="order-summary-box">
				<h2 className="section-title">Your Order</h2>
				<table className="order-table">
					<thead>
						<tr>
							<th>Product</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<tr key={item.id}>
								<td>
									{item.name} × {item.quantity}
								</td>
								<td>₹{item.price * item.quantity}</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<th>Subtotal</th>
							<td>₹{subtotal.toFixed(2)}</td>
						</tr>
						<tr>
							<th>Total</th>
							<td>
								<strong>₹{subtotal.toFixed(2)}</strong>
							</td>
						</tr>
					</tfoot>
				</table>
				<Button
					variant="primary"
					onClick={() => alert("Redirecting to payment...")}
				>
					Checkout
				</Button>
			</aside>
		</div>
	);
};

export default Checkout;
