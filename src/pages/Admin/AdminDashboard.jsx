import React, { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
} from "recharts";
import {
	Home,
	ShoppingCart,
	Package,
	Users,
	BarChart2,
	ChevronsUpDown,
	PlusCircle,
	Search,
	Edit,
	Trash2,
	X,
} from "lucide-react";
import "./Admin.css";

// Mock Data (replace with API calls)
const initialData = {
	dashboard: {
		stats: {
			totalUsers: 1250,
			totalProducts: 890,
			totalOrders: 3450,
			totalRevenue: 150000,
		},
		recentOrders: [
			{
				_id: "o1",
				user: { name: "John Doe" },
				totalPrice: 150.0,
				status: "Processing",
			},
			{
				_id: "o2",
				user: { name: "Jane Smith" },
				totalPrice: 75.5,
				status: "Shipped",
			},
			{
				_id: "o3",
				user: { name: "Peter Jones" },
				totalPrice: 320.0,
				status: "Delivered",
			},
			{
				_id: "o4",
				user: { name: "Mary Lamb" },
				totalPrice: 45.25,
				status: "Pending",
			},
			{
				_id: "o5",
				user: { name: "Chris Green" },
				totalPrice: 88.0,
				status: "Processing",
			},
		],
		monthlySales: [
			{ name: "Jan", sales: 12000 },
			{ name: "Feb", sales: 18000 },
			{ name: "Mar", sales: 15000 },
			{ name: "Apr", sales: 22000 },
			{ name: "May", sales: 19000 },
			{ name: "Jun", sales: 25000 },
			{ name: "Jul", sales: 28000 },
			{ name: "Aug", sales: 32000 },
		],
		topProducts: [
			{ product: { name: "Wireless Mouse" }, totalSold: 520 },
			{ product: { name: "Mechanical Keyboard" }, totalSold: 450 },
			{ product: { name: "4K Monitor" }, totalSold: 300 },
			{ product: { name: "Webcam" }, totalSold: 250 },
			{ product: { name: "USB-C Hub" }, totalSold: 200 },
		],
	},
	products: [
		{
			_id: "p1",
			name: "Wireless Mouse",
			category: { name: "Electronics" },
			price: 25.99,
			stock: 150,
			isActive: true,
		},
		{
			_id: "p2",
			name: "Mechanical Keyboard",
			category: { name: "Electronics" },
			price: 89.99,
			stock: 75,
			isActive: true,
		},
		{
			_id: "p3",
			name: "Cotton T-Shirt",
			category: { name: "Apparel" },
			price: 15.0,
			stock: 300,
			isActive: false,
		},
		{
			_id: "p4",
			name: "Leather Wallet",
			category: { name: "Accessories" },
			price: 40.0,
			stock: 120,
			isActive: true,
		},
	],
	categories: [
		{
			_id: "c1",
			name: "Electronics",
			subcategories: [{ name: "Mice" }, { name: "Keyboards" }],
			isActive: true,
		},
		{
			_id: "c2",
			name: "Apparel",
			subcategories: [{ name: "T-Shirts" }, { name: "Jeans" }],
			isActive: true,
		},
		{
			_id: "c3",
			name: "Accessories",
			subcategories: [{ name: "Wallets" }, { name: "Belts" }],
			isActive: false,
		},
	],
	orders: [
		{
			_id: "o1",
			orderNumber: "ORD-001",
			user: { name: "John Doe", email: "john@example.com" },
			totalPrice: 150.0,
			status: "Processing",
			createdAt: "2024-08-01",
		},
		{
			_id: "o2",
			orderNumber: "ORD-002",
			user: { name: "Jane Smith", email: "jane@example.com" },
			totalPrice: 75.5,
			status: "Shipped",
			createdAt: "2024-08-01",
		},
		{
			_id: "o3",
			orderNumber: "ORD-003",
			user: { name: "Peter Jones", email: "peter@example.com" },
			totalPrice: 320.0,
			status: "Delivered",
			createdAt: "2024-07-31",
		},
	],
	users: [
		{
			_id: "u1",
			name: "John Doe",
			email: "john@example.com",
			role: "user",
			createdAt: "2024-01-15",
		},
		{
			_id: "u2",
			name: "Jane Smith",
			email: "jane@example.com",
			role: "user",
			createdAt: "2024-02-20",
		},
		{
			_id: "u3",
			name: "Admin User",
			email: "admin@example.com",
			role: "admin",
			createdAt: "2024-01-01",
		},
	],
};

const StatCard = ({ title, value, icon, colorClass }) => (
	<div className="stat-card">
		<div className={`stat-card-icon ${colorClass}`}>{icon}</div>
		<div className="stat-card-info">
			<p>{title}</p>
			<h3>{value}</h3>
		</div>
	</div>
);

const DashboardPage = ({ data }) => (
	<div>
		<h1 className="page-title">Dashboard</h1>
		<div className="stats-grid">
			<StatCard
				title="Total Revenue"
				value={`$${data.stats.totalRevenue.toLocaleString()}`}
				icon={<BarChart2 />}
				colorClass="bg-blue"
			/>
			<StatCard
				title="Total Orders"
				value={data.stats.totalOrders.toLocaleString()}
				icon={<ShoppingCart />}
				colorClass="bg-green"
			/>
			<StatCard
				title="Total Products"
				value={data.stats.totalProducts.toLocaleString()}
				icon={<Package />}
				colorClass="bg-yellow"
			/>
			<StatCard
				title="Total Users"
				value={data.stats.totalUsers.toLocaleString()}
				icon={<Users />}
				colorClass="bg-red"
			/>
		</div>
		<div className="dashboard-grid">
			<div className="card chart-card">
				<h2 className="card-title">Monthly Sales</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data.monthlySales}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="sales"
							stroke="#3b82f6"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="card">
				<h2 className="card-title">Top Selling Products</h2>
				<ul className="list">
					{data.topProducts.map((p, i) => (
						<li key={i}>
							<span>{p.product.name}</span>
							<strong>{p.totalSold} sold</strong>
						</li>
					))}
				</ul>
			</div>
		</div>
		<div className="card mt-24">
			<h2 className="card-title">Recent Orders</h2>
			<div className="table-container">
				<table className="table">
					<thead>
						<tr>
							<th>Customer</th>
							<th>Total</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{data.recentOrders.map((order) => (
							<tr key={order._id}>
								<td>{order.user.name}</td>
								<td>${order.totalPrice.toFixed(2)}</td>
								<td>
									<span
										className={`status-badge status-${order.status.toLowerCase()}`}
									>
										{order.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
);

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
	const [formData, setFormData] = useState({});

	useEffect(() => {
		setFormData(
			product || {
				name: "",
				price: "",
				stock: "",
				category: "",
				isActive: true,
			}
		);
	}, [product]);

	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h2>{product ? "Edit Product" : "Add Product"}</h2>
					<button onClick={onClose} className="btn-icon">
						<X size={24} />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Product Name</label>
						<input
							type="text"
							name="name"
							value={formData.name || ""}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-grid">
						<div className="form-group">
							<label>Price</label>
							<input
								type="number"
								name="price"
								value={formData.price || ""}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label>Stock</label>
							<input
								type="number"
								name="stock"
								value={formData.stock || ""}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="form-group">
						<label>Category</label>
						<input
							type="text"
							name="category"
							value={formData.category?.name || ""}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group-checkbox">
						<label>
							<input
								type="checkbox"
								name="isActive"
								checked={formData.isActive || false}
								onChange={handleChange}
							/>
							<span>Active</span>
						</label>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							onClick={onClose}
							className="btn btn-secondary"
						>
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Save Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const ProductsPage = ({ data, setData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	const handleSave = (productData) => {
		if (editingProduct) {
			setData((prev) => ({
				...prev,
				products: prev.products.map((p) =>
					p._id === editingProduct._id
						? { ...p, ...productData, category: { name: productData.category } }
						: p
				),
			}));
		} else {
			const newProduct = {
				...productData,
				_id: `p${Date.now()}`,
				category: { name: productData.category },
			};
			setData((prev) => ({
				...prev,
				products: [...prev.products, newProduct],
			}));
		}
		setEditingProduct(null);
		setIsModalOpen(false);
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setIsModalOpen(true);
	};

	const handleDelete = (productId) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			setData((prev) => ({
				...prev,
				products: prev.products.filter((p) => p._id !== productId),
			}));
		}
	};

	return (
		<div>
			<div className="page-header">
				<h1 className="page-title">Products</h1>
				<button
					onClick={() => {
						setEditingProduct(null);
						setIsModalOpen(true);
					}}
					className="btn btn-primary"
				>
					<PlusCircle size={20} />
					<span>Add Product</span>
				</button>
			</div>
			<div className="card">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((product) => (
								<tr key={product._id}>
									<td>
										<strong>{product.name}</strong>
									</td>
									<td>{product.category.name}</td>
									<td>${product.price.toFixed(2)}</td>
									<td>{product.stock}</td>
									<td>
										<span
											className={`status-badge ${
												product.isActive ? "status-active" : "status-inactive"
											}`}
										>
											{product.isActive ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="actions">
										<button
											onClick={() => handleEdit(product)}
											className="btn-icon text-blue"
										>
											<Edit size={18} />
										</button>
										<button
											onClick={() => handleDelete(product._id)}
											className="btn-icon text-red"
										>
											<Trash2 size={18} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<ProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				product={editingProduct}
				onSave={handleSave}
			/>
		</div>
	);
};

const CategoriesPage = ({ data, setData }) => {
	const handleDelete = (categoryId) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			setData((prev) => ({
				...prev,
				categories: prev.categories.filter((c) => c._id !== categoryId),
			}));
		}
	};

	return (
		<div>
			<div className="page-header">
				<h1 className="page-title">Categories</h1>
				<button className="btn btn-primary">
					<PlusCircle size={20} />
					<span>Add Category</span>
				</button>
			</div>
			<div className="card">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Subcategories</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((category) => (
								<tr key={category._id}>
									<td>
										<strong>{category.name}</strong>
									</td>
									<td>
										{category.subcategories.map((s) => s.name).join(", ")}
									</td>
									<td>
										<span
											className={`status-badge ${
												category.isActive ? "status-active" : "status-inactive"
											}`}
										>
											{category.isActive ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="actions">
										<button className="btn-icon text-blue">
											<Edit size={18} />
										</button>
										<button
											onClick={() => handleDelete(category._id)}
											className="btn-icon text-red"
										>
											<Trash2 size={18} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const OrdersPage = ({ data }) => {
	return (
		<div>
			<h1 className="page-title">Orders</h1>
			<div className="card">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Order #</th>
								<th>Customer</th>
								<th>Date</th>
								<th>Total</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((order) => (
								<tr key={order._id}>
									<td>
										<strong>{order.orderNumber}</strong>
									</td>
									<td>{order.user.name}</td>
									<td>{new Date(order.createdAt).toLocaleDateString()}</td>
									<td>${order.totalPrice.toFixed(2)}</td>
									<td>
										<span
											className={`status-badge status-${order.status.toLowerCase()}`}
										>
											{order.status}
										</span>
									</td>
									<td className="actions">
										<button className="btn-link">View Details</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const UsersPage = ({ data }) => {
	return (
		<div>
			<h1 className="page-title">Users</h1>
			<div className="card">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Joined</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((user) => (
								<tr key={user._id}>
									<td>
										<strong>{user.name}</strong>
									</td>
									<td>{user.email}</td>
									<td>
										<span
											className={`status-badge ${
												user.role === "admin" ? "status-admin" : "status-user"
											}`}
										>
											{user.role}
										</span>
									</td>
									<td>{new Date(user.createdAt).toLocaleDateString()}</td>
									<td className="actions">
										<button className="btn-icon text-blue">
											<Edit size={18} />
										</button>
										{user.role !== "admin" && (
											<button className="btn-icon text-red">
												<Trash2 size={18} />
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const Sidebar = ({ activePage, setActivePage }) => {
	const navItems = [
		{ name: "Dashboard", icon: <Home size={20} /> },
		{ name: "Products", icon: <Package size={20} /> },
		{ name: "Categories", icon: <ChevronsUpDown size={20} /> },
		{ name: "Orders", icon: <ShoppingCart size={20} /> },
		{ name: "Users", icon: <Users size={20} /> },
	];

	return (
		<aside className="sidebar">
			<div className="sidebar-header">Admin Panel</div>
			<nav className="sidebar-nav">
				<ul>
					{navItems.map((item) => (
						<li key={item.name}>
							<a
								href="#"
								onClick={() => setActivePage(item.name)}
								className={activePage === item.name ? "active" : ""}
							>
								{item.icon}
								<span>{item.name}</span>
							</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

const Header = () => (
	<header className="header">
		<div className="search-container">
			<Search className="search-icon" />
			<input type="text" placeholder="Search..." className="search-input" />
		</div>
		<div className="profile-container">
			<img
				src="https://placehold.co/40x40/E2E8F0/4A5568?text=A"
				alt="Admin"
				className="profile-avatar"
			/>
		</div>
	</header>
);

const AdminDashboard = () => {
	const [activePage, setActivePage] = useState("Dashboard");
	const [data, setData] = useState(initialData);

	const renderPage = () => {
		switch (activePage) {
			case "Dashboard":
				return <DashboardPage data={data.dashboard} />;
			case "Products":
				return <ProductsPage data={data.products} setData={setData} />;
			case "Categories":
				return <CategoriesPage data={data.categories} setData={setData} />;
			case "Orders":
				return <OrdersPage data={data.orders} />;
			case "Users":
				return <UsersPage data={data.users} />;
			default:
				return <DashboardPage data={data.dashboard} />;
		}
	};

	return (
		<div className="admin-panel-scope">
			<div className="app-container">
				<Sidebar activePage={activePage} setActivePage={setActivePage} />
				<div className="main-content">
					<Header />
					<main className="page-content">{renderPage()}</main>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
