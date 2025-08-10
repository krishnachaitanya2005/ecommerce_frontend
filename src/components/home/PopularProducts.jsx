import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import Loader from "../common/Loader";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./PopularProducts.css";

// This is your master list of all popular products
const allPopularProducts = [
	{
		_id: "5",
		name: "VNEED Women Embroidered Kurta",
		images: [{ url: "" }],
		price: 450,
		originalPrice: 490,
		category: "Fashion",
		brand: "VNEED",
		rating: 4,
	},
	{
		_id: "6",
		name: "Black Solid Casual Shirt",
		images: [{ url: "" }],
		price: 459,
		originalPrice: 495,
		category: "Fashion",
		brand: "V-Mart",
		rating: 5,
	},
	{
		_id: "3",
		name: "Samsung Galaxy Watch 5",
		images: [{ url: "" }],
		price: 250,
		originalPrice: 299,
		category: "Electronics",
		brand: "Samsung",
		rating: 4,
	},
	{
		_id: "1",
		name: "HP Laptop 15s",
		images: [{ url: "" }],
		price: 3000,
		originalPrice: 3500,
		category: "Electronics",
		brand: "HP",
		rating: 3,
	},
	{
		_id: "7",
		name: "Classic Leather Bag",
		images: [{ url: "" }],
		price: 120,
		originalPrice: 150,
		category: "Bags",
		brand: "Generic",
		rating: 4,
	},
	{
		_id: "8",
		name: "Running Shoes",
		images: [{ url: "" }],
		price: 80,
		originalPrice: 100,
		category: "Footwear",
		brand: "BrandX",
		rating: 2,
	},
	{
		_id: "9",
		name: "Organic Apples",
		images: [{ url: "" }],
		price: 5,
		originalPrice: 6,
		category: "Groceries",
		brand: "FarmFresh",
		rating: 5,
	},
];
const PopularProducts = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentTab, setCurrentTab] = useState("All");
	const [loading, setLoading] = useState(true);

	const tabCategories = [
		"All",
		"Fashion",
		"Electronics",
		"Bags",
		"Footwear",
		"Groceries",
		"Beauty",
		"Wellness",
		"Jewellery",
	];

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			if (currentTab === "All") {
				setFilteredProducts(allPopularProducts);
			} else {
				const filtered = allPopularProducts.filter(
					(product) => product.category === currentTab
				);
				setFilteredProducts(filtered);
			}
			setLoading(false);
		}, 500);
	}, [currentTab]);

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<section className="popular-products-section home-container">
			<div className="section-header">
				<h2 className="section-title">Popular Products</h2>
				<Box sx={{ bgcolor: "background.paper" }}>
					<Tabs
						value={currentTab}
						onChange={handleTabChange}
						variant="scrollable"
						scrollButtons="auto"
						aria-label="popular products categories"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: "var(--primary-color)",
							},
							"& .MuiTab-root": {
								color: "var(--light-text-color)",
								textTransform: "capitalize",
								fontSize: "var(--text-font-size)",
							},
							"& .Mui-selected": { color: "var(--primary-color) !important" },
						}}
					>
						{tabCategories.map((category) => (
							<Tab key={category} label={category} value={category} />
						))}
					</Tabs>
				</Box>
			</div>
			{loading ? (
				<Loader />
			) : (
				<div className="products-grid">
					{filteredProducts.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</section>
	);
};

export default PopularProducts;
