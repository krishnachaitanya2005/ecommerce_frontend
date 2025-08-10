import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";
import Button from "../components/ui/Button";
import ProductCard from "../components/common/ProductCard";
import Loader from "../components/common/Loader";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import "./ProductDetail.css";

const allProducts = [
	{
		id: "1",
		name: "Black solid casual shirt",
		image:
			"https://media.istockphoto.com/id/1333923906/photo/cheerful-asian-young-man-in-black-clothes.webp?a=1&b=1&s=612x612&w=0&k=20&c=hWZo-xwd3gv3uGWL87LZnLRXjcikRSp4Wpw2feW3swE=",
		images: [
			"https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
			"https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
			"https://plus.unsplash.com/premium_photo-1689629728966-0d248b5aeda2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
		],
		price: 459,
		originalPrice: 699,
		rating: 4,
		reviews: 11,
		category: "Fashion",
		description:
			"A comfortable and stylish casual shirt, perfect for any occasion...",
		availableSizes: ["S", "M", "L", "XL"],
	},
	{
		id: "2",
		name: "Glitto Black Solid Sports Wear",
		image: "https://via.placeholder.com/500x500/37474F/fff?text=Jacket",
		images: ["https://via.placeholder.com/500x500/37474F/fff?text=Jacket"],
		price: 460,
		originalPrice: 799,
		rating: 5,
		reviews: 5,
		category: "Fashion",
		description: "Dry-fit regular fit sports wear...",
		availableSizes: ["M", "L"],
	},
	{
		id: "3",
		name: "Siril Poly Silk Saree",
		image: "https://via.placeholder.com/500x500/F8BBD0/fff?text=Saree",
		images: ["https://via.placeholder.com/500x500/F8BBD0/fff?text=Saree"],
		price: 550,
		originalPrice: 1000,
		rating: 2,
		reviews: 3,
		category: "Fashion",
		description: "Elegant poly silk saree for parties.",
	},
	{
		id: "4",
		name: "VNEED Cotton Blend Kurta",
		image: "https://via.placeholder.com/500x500/00695C/fff?text=Kurta",
		images: ["https://via.placeholder.com/500x500/00695C/fff?text=Kurta"],
		price: 500,
		originalPrice: 655,
		rating: 5,
		reviews: 12,
		category: "Fashion",
		description: "Stylish black kurta for a classic look.",
	},
];

const additionalInfoData = [
	{ spec: "Frame", value: "Aluminum" },
	{ spec: "Weight (w/o wheels)", value: "20 LBS" },
	{ spec: "Size", value: "M, S" },
];
const reviewsData = [
	{ user: "Rajesh", date: "2025-06-09", rating: 3, comment: "nice" },
	{ user: "Akbar Ali", date: "2025-04-04", rating: 2, comment: "gggg" },
	{ user: "Akbar Ali", date: "2025-04-04", rating: 2, comment: "gggg" },
	{ user: "Akbar Ali", date: "2025-04-04", rating: 2, comment: "gggg" },
];

const ProductDetail = () => {
	const { id } = useParams();
	const { addToCart, addToWishlist } = useGlobalState();
	const [product, setProduct] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [currentImage, setCurrentImage] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	const [selectedSize, setSelectedSize] = useState(null);
	const [newReviewText, setNewReviewText] = useState("");
	const [newReviewRating, setNewReviewRating] = useState(0);
	const [loading, setLoading] = useState(true);

	const [hoverRating, setHoverRating] = useState(0);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			const foundProduct = allProducts.find((p) => p.id === id);
			setProduct(foundProduct);
			if (foundProduct) {
				setCurrentImage(foundProduct.images[0]);
				if (
					foundProduct.availableSizes &&
					foundProduct.availableSizes.length > 0
				) {
					setSelectedSize(foundProduct.availableSizes[0]);
				}
				const related = allProducts.filter(
					(p) =>
						p.category === foundProduct.category && p.id !== foundProduct.id
				);
				setRelatedProducts(related);
			}
			setLoading(false);
		}, 500);
	}, [id]);

	const renderStars = (rating) => {
		const totalStars = 5;
		const stars = [];
		for (let i = 1; i <= totalStars; i++) {
			stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
		}
		return stars;
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		if (newReviewText && newReviewRating > 0) {
			alert(
				`Review Submitted!\nRating: ${newReviewRating} stars\nComment: ${newReviewText}`
			);
			setNewReviewText("");
			setNewReviewRating(0);
		} else {
			alert("Please provide a rating and a comment.");
		}
	};

	if (loading) return <Loader />;
	if (!product)
		return (
			<div className="container">
				<h2>Product not found!</h2>
			</div>
		);

	return (
		<div className="product-detail-page">
			<div className="detail-grid">
				<div className="product-gallery">
					<div className="main-image">
						<img src={currentImage} alt={product.name} />
					</div>
					<div className="thumbnail-images">
						{product.images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={`thumbnail ${index + 1}`}
								className={currentImage === img ? "active" : ""}
								onClick={() => setCurrentImage(img)}
							/>
						))}
					</div>
				</div>

				<div className="product-details-info">
					<h1>{product.name}</h1>
					<div className="details-rating">
						<div className="star-display">{renderStars(product.rating)}</div> (
						{product.reviews} reviews)
					</div>
					<div className="details-price">
						<span className="current-price">Rs. {product.price}</span>
						{product.originalPrice && (
							<span className="original-price">
								Rs. {product.originalPrice}
							</span>
						)}
					</div>
					<p className="details-description">{product.description}</p>

					{product.availableSizes && (
						<div className="size-selector">
							<span>Size:</span>
							<div className="size-options">
								{product.availableSizes.map((size) => (
									<button
										key={size}
										className={selectedSize === size ? "active" : ""}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					<div className="details-actions">
						<div className="quantity-selector">
							<button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
								-
							</button>
							<span>{quantity}</span>
							<button onClick={() => setQuantity((q) => q + 1)}>+</button>
						</div>
						<Button
							variant="primary"
							onClick={() => addToCart({ ...product, quantity })}
						>
							Add To Cart
						</Button>
						<button
							className="wishlist-btn"
							onClick={() => addToWishlist(product)}
						>
							<FaHeart />
						</button>
					</div>
				</div>
			</div>

			<div className="product-info-chips">
				<button
					onClick={() => setActiveTab("description")}
					className={activeTab === "description" ? "active" : ""}
				>
					Description
				</button>
				<button
					onClick={() => setActiveTab("info")}
					className={activeTab === "info" ? "active" : ""}
				>
					Additional Info
				</button>
				<button
					onClick={() => setActiveTab("reviews")}
					className={activeTab === "reviews" ? "active" : ""}
				>
					Reviews ({product.reviews})
				</button>
			</div>

			<div className="product-info-content">
				{activeTab === "description" && (
					<div className="tab-pane">
						<p>{product.description}</p>
					</div>
				)}
				{activeTab === "info" && (
					<div className="tab-pane">
						<table className="info-table">
							<tbody>
								{additionalInfoData.map((info) => (
									<tr key={info.spec}>
										<th>{info.spec}</th>
										<td>{info.value}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{activeTab === "reviews" && (
					<div className="tab-pane">
						<h3 className="reviews-title">Customer questions & answers</h3>
						<div className="reviews-list">
							{reviewsData.map((review, index) => (
								<div key={index} className="review-card">
									<div className="review-user-initial">
										{review.user.charAt(0)}
									</div>
									<div className="review-details">
										<div className="review-header">
											<span>{review.user}</span>
											<div className="review-rating star-display">
												{renderStars(review.rating)}
											</div>
										</div>
										<small>{review.date}</small>
										<p>{review.comment}</p>
									</div>
								</div>
							))}
						</div>
						<h3 className="reviews-title">Add a review</h3>
						<form className="add-review-form" onSubmit={handleReviewSubmit}>
							<div
								className="star-rating-input"
								onMouseLeave={() => setHoverRating(0)}
							>
								{[...Array(5)].map((_, index) => {
									const ratingValue = index + 1;
									return (
										<FaStar
											key={index}
											size={24}
											color={
												ratingValue <= (hoverRating || newReviewRating)
													? "#ffc107"
													: "#e4e5e9"
											}
											onClick={() => setNewReviewRating(ratingValue)}
											onMouseEnter={() => setHoverRating(ratingValue)}
											style={{ cursor: "pointer" }}
										/>
									);
								})}
							</div>
							<textarea
								value={newReviewText}
								onChange={(e) => setNewReviewText(e.target.value)}
								placeholder="Write a Review"
								rows="5"
							></textarea>
							<Button type="submit">Submit Review</Button>
						</form>
					</div>
				)}
			</div>

			<div className="related-products">
				<h2 className="section-title">Related products</h2>
				<div className="products-grid">
					{relatedProducts.map((relatedProd) => (
						<ProductCard key={relatedProd.id} product={relatedProd} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
