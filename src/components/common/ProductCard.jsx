import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaStar, FaRegStar } from "react-icons/fa";
import { useGlobalState } from "../../context/GlobalStateContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
	const { addToWishlist } = useGlobalState();
	// Destructure rating from the product prop
	const { _id, name, images, price, originalPrice, category, brand, rating } =
		product;

	const renderStars = () => {
		const totalStars = 5;
		const filledStars = rating || 0;
		const stars = [];
		for (let i = 1; i <= totalStars; i++) {
			if (i <= filledStars) {
				stars.push(<FaStar key={i} />);
			} else {
				stars.push(<FaRegStar key={i} />);
			}
		}
		return stars;
	};

	return (
		<div className="product-card">
			<div className="product-image-container">
				<Link to={`/product/${_id}`}>
					<img
						src={
							images && images.length > 0
								? images[0].url
								: "https://via.placeholder.com/250"
						}
						alt={name}
					/>
				</Link>
				<div className="product-hover-icons">
					<button className="icon-btn" onClick={() => addToWishlist(product)}>
						<FaHeart />
					</button>
					<Link to={`/product/${_id}`} className="icon-btn">
						<FaEye />
					</Link>
				</div>
			</div>
			<div className="product-info">
				<span className="product-category">{category}</span>
				<h3 className="product-name">
					<Link to={`/product/${_id}`}>{name}</Link>
				</h3>
				<div className="product-rating">{renderStars()}</div>
				<span className="product-brand">By {brand}</span>
				<div className="product-price-container">
					<span className="product-price">Rs {price}</span>
					{originalPrice && (
						<span className="product-original-price">Rs {originalPrice}</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
