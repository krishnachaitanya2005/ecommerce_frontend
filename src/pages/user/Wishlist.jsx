import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaStar, FaRegStar } from "react-icons/fa";
import { useGlobalState } from "../../context/GlobalStateContext";
import "./Wishlist.css";

const Wishlist = () => {
	const { wishlistItems, removeFromWishlist } = useGlobalState();

	const renderStars = (rating) => {
		const totalStars = 5;
		const stars = [];
		for (let i = 1; i <= totalStars; i++) {
			stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
		}
		return stars;
	};

	if (wishlistItems.length === 0) {
		return (
			<div className="empty-state-container container">
				<div className="empty-state-icon">❤️</div>
				<h2>Your Wishlist is currently empty</h2>
				<Link to="/" className="continue-shopping-btn">
					Continue Shopping
				</Link>
			</div>
		);
	}

	return (
		<div className="wishlist-page container">
			<h1 className="page-title">My List</h1>
			<p>There are {wishlistItems.length} products in your Wishlist</p>

			<div className="wishlist-items-list">
				<div className="wishlist-table-wrapper">
					<div className="wishlist-header">
						<div className="header-product">Product</div>
						<div className="header-price">Price</div>
						<div className="header-remove">Remove</div>
					</div>
					{wishlistItems.map((item) => (
						<div key={item.id} className="wishlist-item">
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
							<div className="item-remove">
								<FaTrashAlt
									className="remove-icon"
									onClick={() => removeFromWishlist(item.id)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
