import React from "react";
import ProductCard from "../common/ProductCard";
import "./FeaturedProducts.css";

const featuredProducts = [
	{
		id: "10",
		name: "Men Round Toe Lace-Up",
		images: [{ url: "https://via.placeholder.com/250" }],
		price: 1200,
		category: "Footwear",
		brand: "Generic",
		rating: 4,
	},
	{
		id: "11",
		name: "OnePlus Nord CE 3 Lite 5G",
		images: [{ url: "https://via.placeholder.com/250" }],
		price: 15490,
		category: "Electronics",
		brand: "OnePlus",
		rating: 5,
	},
	{
		id: "12",
		name: "Refurbished Dell Latitude",
		images: [{ url: "https://via.placeholder.com/250" }],
		price: 20199,
		category: "Electronics",
		brand: "Dell",
		rating: 4,
	},
	{
		id: "13",
		name: "Super Grocery Sale Pack",
		images: [{ url: "https://via.placeholder.com/250" }],
		price: 500,
		category: "Groceries",
		brand: "Generic",
		rating: 5,
	},
];

const FeaturedProducts = () => {
	return (
		<section className="featured-products-section home-container">
			<h2 className="section-title">Featured Products</h2>
			<div className="products-grid">
				{featuredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
				<div className="featured-offer-image">
					<img
						src="https://via.placeholder.com/250x540/C8E6C9/000?text=Super+Grocery+Sale"
						alt="Super Grocery Sale"
					/>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;
