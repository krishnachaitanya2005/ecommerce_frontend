import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { navItems } from "../data/navigation";
import Slider from "@mui/material/Slider";
import {
	FaStar,
	FaShoppingBag,
	FaLaptop,
	FaTshirt,
	FaShoePrints,
	FaAppleAlt,
	FaMagic,
	FaTimes,
} from "react-icons/fa";
import { useGlobalState } from "../context/GlobalStateContext";

import "./ProductListing.css";

const allProductsForCategory = [
	{
		id: "1",
		name: "HP Laptop 15s",
		images: [{ url: "" }],
		price: 55000,
		category: "Electronics",
		subcategory: "Laptops",
		brand: "HP",
		rating: 4,
		onSale: true,
	},
	{
		id: "2",
		name: "Apple iPhone 14 Pro",
		images: [{ url: "" }],
		price: 120000,
		category: "Electronics",
		subcategory: "Mobiles",
		brand: "Apple",
		rating: 5,
		onSale: false,
	},
	{
		id: "3",
		name: "Sony Alpha a7 IV",
		images: [{ url: "" }],
		price: 210000,
		category: "Electronics",
		subcategory: "Cameras",
		brand: "Sony",
		rating: 5,
		onSale: false,
	},
	{
		id: "4",
		name: "Dell XPS 13",
		images: [{ url: "" }],
		price: 95000,
		category: "Electronics",
		subcategory: "Laptops",
		brand: "Dell",
		rating: 4,
		onSale: true,
	},
	{
		id: "5",
		name: "Bose QuietComfort 45",
		images: [{ url: "" }],
		price: 28000,
		category: "Electronics",
		subcategory: "Headphones",
		brand: "Bose",
		rating: 5,
		onSale: true,
	},
	{
		id: "6",
		name: "Basic Cotton T-Shirt",
		images: [{ url: "" }],
		price: 500,
		category: "Fashion",
		subcategory: "Men",
		brand: "Generic",
		rating: 3,
		onSale: false,
	},
	{
		id: "7",
		name: "Leather Handbag",
		images: [{ url: "" }],
		price: 3500,
		category: "Bags",
		subcategory: "Womens Bags",
		brand: "BrandX",
		rating: 4,
		onSale: true,
	},
	{
		id: "8",
		name: "Running Sneakers",
		images: [{ url: "" }],
		price: 2500,
		category: "Footwear",
		subcategory: "Mens Footwear",
		brand: "BrandY",
		rating: 2,
		onSale: false,
	},
];

const categoryIcons = {
	Fashion: <FaTshirt />,
	Electronics: <FaLaptop />,
	Bags: <FaShoppingBag />,
	Footwear: <FaShoePrints />,
	Groceries: <FaAppleAlt />,
	Beauty: <FaMagic />,
};

const ProductListing = () => {
	const { isFilterSidebarOpen, toggleFilterSidebar } = useGlobalState();
	const { category } = useParams();
	const [masterProductList, setMasterProductList] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const [activeSubcategory, setActiveSubcategory] = useState("All");
	const [priceRange, setPriceRange] = useState([100, 300000]);
	const [selectedRating, setSelectedRating] = useState(0);
	const [saleFilterActive, setSaleFilterActive] = useState(false);

	const currentCategoryData = navItems.find(
		(item) => item.label.toLowerCase() === category
	);
	const subcategories = currentCategoryData?.dropdown || [];

	useEffect(() => {
		const productsForCurrentCategory = allProductsForCategory.filter(
			(p) => p.category.toLowerCase() === category
		);
		setMasterProductList(productsForCurrentCategory);
		setActiveSubcategory("All");
	}, [category]);

	useEffect(() => {
		let tempProducts = [...masterProductList];
		if (activeSubcategory !== "All") {
			tempProducts = tempProducts.filter(
				(p) => p.subcategory === activeSubcategory
			);
		}
		tempProducts = tempProducts.filter(
			(p) => p.price >= priceRange[0] && p.price <= priceRange[1]
		);
		if (selectedRating > 0) {
			tempProducts = tempProducts.filter((p) => p.rating >= selectedRating);
		}
		if (saleFilterActive) {
			tempProducts = tempProducts.filter((p) => p.onSale === true);
		}
		setFilteredProducts(tempProducts);
	}, [
		activeSubcategory,
		priceRange,
		selectedRating,
		saleFilterActive,
		masterProductList,
	]);

	return (
		<>
			<div className="page-header-bar">
				<div className="container">
					<h1 className="page-header-title">{category}</h1>
					<nav className="page-header-nav">
						<Link to="/">Home</Link>
						<button
							className={`filter-button ${
								activeSubcategory === "All" ? "active" : ""
							}`}
							onClick={() => setActiveSubcategory("All")}
						>
							All
						</button>
						{subcategories.map((sub) => (
							<button
								key={sub}
								className={`filter-button ${
									activeSubcategory === sub ? "active" : ""
								}`}
								onClick={() => setActiveSubcategory(sub)}
							>
								{sub}
							</button>
						))}
					</nav>
				</div>
			</div>

			<div className="product-listing-page container">
				<aside
					className={`filters-sidebar ${isFilterSidebarOpen ? "open" : ""}`}
				>
					<div className="filter-sidebar-content">
						<div className="filter-card">
							<h3 className="filter-title">Category</h3>
							<div className="category-filter-list">
								{navItems
									.filter(
										(item) => item.label !== "Home" && item.label !== "Shop"
									)
									.map((item) => (
										<Link
											to={item.link}
											key={item.label}
											className={`category-filter-item ${
												category === item.label.toLowerCase() ? "active" : ""
											}`}
										>
											{categoryIcons[item.label] || <FaShoppingBag />}
											<span>{item.label}</span>
										</Link>
									))}
							</div>
						</div>
						<div className="filter-card">
							<h3 className="filter-title">Filter by price</h3>
							<Slider
								value={priceRange}
								onChange={(e, val) => setPriceRange(val)}
								valueLabelDisplay="auto"
								min={100}
								max={300000}
								sx={{ color: "var(--primary-color)" }}
							/>
							<div className="price-labels">
								<span>
									From:{" "}
									<strong className="price-value">Rs: {priceRange[0]}</strong>
								</span>
								<span>
									To:{" "}
									<strong className="price-value">Rs: {priceRange[1]}</strong>
								</span>
							</div>
							<h3 className="filter-title" style={{ marginTop: "30px" }}>
								Filter By Ratings
							</h3>
							<ul className="rating-filter-list">
								{[5, 4, 3, 2, 1].map((star) => (
									<li
										key={star}
										onClick={() => setSelectedRating(star)}
										className={selectedRating === star ? "active" : ""}
									>
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												color={i < star ? "#ffc107" : "#e4e5e9"}
											/>
										))}
									</li>
								))}
							</ul>
							<button
								className="clear-filter-btn"
								onClick={() => setSelectedRating(0)}
							>
								Clear Rating
							</button>
						</div>
						<div className="offer-filter-card">
							<img
								src="https://via.placeholder.com/230x280/80DEEA/000000?text=Sale+Up+To+50%25"
								alt="Sale up to 50% off"
								className={`offer-image ${saleFilterActive ? "active" : ""}`}
								onClick={() => setSaleFilterActive(!saleFilterActive)}
							/>
							<img
								src="https://via.placeholder.com/230x280/80DEEA/000000?text=Sale+Up+To+50%25"
								alt="Sale up to 50% off"
								className={`offer-image ${saleFilterActive ? "active" : ""}`}
								onClick={() => setSaleFilterActive(!saleFilterActive)}
							/>
						</div>{" "}
					</div>
				</aside>

				<main className="products-main">
					<p className="item-count">
						We found {filteredProducts.length} items for you!
					</p>
					<div className="products-grid">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</main>
			</div>
		</>
	);
};

export default ProductListing;
