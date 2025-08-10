import React from "react";
import { Link } from "react-router-dom";
import "./OfferBanners.css";

const OfferBanners = () => {
	// Replace these with your actual offer images and links
	const banners = [
		{
			img: "https://via.placeholder.com/280x180/E0F7FA/000?text=Grocery+Sale",
			link: "/products/groceries",
		},
		{
			img: "https://via.placeholder.com/280x180/FFF9C4/000?text=Fashion+Sale",
			link: "/products/fashion",
		},
		{
			img: "https://via.placeholder.com/280x180/FCE4EC/000?text=New+Dresses",
			link: "/products/fashion",
		},
		{
			img: "https://via.placeholder.com/280x180/CFD8DC/000?text=Black+Friday",
			link: "/products",
		},
	];

	return (
		<section className="offer-banners-section home-container">
			<div className="banners-grid">
				{banners.map((banner, index) => (
					<Link to={banner.link} key={index} className="banner-item">
						<img src={banner.img} alt={`Offer Banner ${index + 1}`} />
					</Link>
				))}
			</div>
		</section>
	);
};

export default OfferBanners;
