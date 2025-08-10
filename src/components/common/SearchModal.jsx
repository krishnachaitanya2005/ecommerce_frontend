import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalStateContext";
import { allProducts } from "../../data/allProducts";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchModal.css";

const SearchModal = () => {
	const { isSearchModalOpen, toggleSearchModal } = useGlobalState();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setSearchResults([]);
			return;
		}
		const filtered = allProducts.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setSearchResults(filtered);
	}, [searchQuery]);

	const handleResultClick = () => {
		setSearchQuery("");
		setSearchResults([]);
		toggleSearchModal();
	};

	return (
		<div className={`search-modal ${isSearchModalOpen ? "open" : ""}`}>
			<div className="search-modal-header">
				<div className="search-modal-input-wrapper">
					<input
						type="text"
						placeholder="Search for items..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						autoFocus
					/>
					<FaSearch className="search-modal-icon" />
				</div>
				<button className="close-search-btn" onClick={toggleSearchModal}>
					<FaTimes />
				</button>
			</div>
			<div className="search-modal-results">
				<ul>
					{searchResults.map((product) => (
						<li key={product.id}>
							<Link
								to={`/product/${product.id}`}
								className="search-result-item"
								onClick={handleResultClick}
							>
								<img src={product.images[0].url} alt={product.name} />
								<span>{product.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SearchModal;
