import React from "react";
import { Link } from "react-router-dom";
import "./HomeCategories.css";

const HomeCategories = () => {
	const categories = [
		{
			name: "Fashion",
			image: "/assets/featured_category_images/file_1734525204708_fash.png",
			bgColor: "rgba(255, 221, 193, 0.5)",
		},
		{
			name: "Electronics",
			image: "/assets/featured_category_images/file_1734525218436_ele.png",
			bgColor: "rgba(212, 241, 244, 0.5)",
		},
		{
			name: "Bags",
			image: "/assets/featured_category_images/file_1734525231018_bag.png",
			bgColor: "rgba(246, 198, 234, 0.5)",
		},
		{
			name: "Footwear",
			image: "/assets/featured_category_images/file_1734525239704_foot.png",
			bgColor: "rgba(178, 235, 242, 0.5)",
		},
		{
			name: "Groceries",
			image: "/assets/featured_category_images/file_1734525248057_gro.png",
			bgColor: "rgba(255, 230, 230, 0.5)",
		},
		{
			name: "Beauty",
			image: "/assets/featured_category_images/file_1734525255799_beauty.png",
			bgColor: "rgba(250, 220, 217, 0.5)",
		},
		{
			name: "Wellness",
			image: "/assets/featured_category_images/file_1734525275367_well.png",
			bgColor: "rgba(225, 245, 254, 0.5)",
		},
		{
			name: "Jewellery",
			image: "/assets/featured_category_images/file_1734525286186_jw.png",
			bgColor: "rgba(209, 255, 189, 0.5)",
		},
	];

	return (
		<section className="home-categories-section container">
			<h2 className="section-title">Featured Categories</h2>
			<div className="categories-grid">
				{categories.map((category) => (
					<Link
						to={`/products/${category.name.toLowerCase()}`}
						key={category.name}
						className="category-item"
					>
						<div
							className="category-icon-circle"
							style={{ backgroundColor: category.bgColor }}
						>
							<img src={category.image} alt={category.name} />
						</div>
						<span>{category.name}</span>
					</Link>
				))}
			</div>
		</section>
	);
};

export default HomeCategories;
