import React, { useState, useEffect } from "react";
import Loader from "../../components/common/Loader";
import "../../styles/Table.css";
import "./Orders.css";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		// In a real app, you would fetch the user's orders from your API here.
		// We'll simulate a 1-second network delay.
		setTimeout(() => {
			const mockOrders = [
				{
					id: "ORD-123",
					products: "HP Laptop",
					date: "2025-07-15",
					total: 3000,
					status: "processing",
				},
				{
					id: "ORD-124",
					products: "iPhone 14",
					date: "2025-07-10",
					total: 999,
					status: "delivered",
				},
				{
					id: "ORD-125",
					products: "Galaxy Watch",
					date: "2025-07-05",
					total: 250,
					status: "cancelled",
				},
			];
			setOrders(mockOrders);
			setLoading(false); // Set loading to false after data is "fetched"
		}, 1000);
	}, []);

	if (loading) {
		return (
			<div className="container">
				<h1 className="page-title">My Orders</h1>
				<Loader />
			</div>
		);
	}

	return (
		<div className="container">
			<h1 className="page-title">My Orders</h1>
			<div className="table-container">
				<table className="data-table">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Products</th>
							<th>Date</th>
							<th>Total Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.products}</td>
								<td>{order.date}</td>
								<td>Rs {order.total}</td>
								<td>
									<span className={`status-badge status-${order.status}`}>
										{order.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Orders;
