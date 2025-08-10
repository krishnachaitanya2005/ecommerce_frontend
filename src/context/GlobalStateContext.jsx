import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("authToken")
	);

	const [cartItems, setCartItems] = useState([]);
	const [wishlistItems, setWishlistItems] = useState([]);

	const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

	const toggleFilterSidebar = () => {
		setIsFilterSidebarOpen((prevState) => !prevState);
	};
	const login = (token) => {
		localStorage.setItem("authToken", token);
		setIsAuthenticated(true);
		toast.success("Successfully logged in!");
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
		setCartItems([]);
		setWishlistItems([]);
		toast.info("You have been logged out.");
	};

	const toastOptions = {
		className: "custom-toast",
		icon: <FaCheckCircle />,
	};

	const addToCart = (productToAdd) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find(
				(item) => item.id === productToAdd.id
			);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === productToAdd.id
						? {
								...item,
								quantity: item.quantity + (productToAdd.quantity || 1),
						  }
						: item
				);
			}
			return [
				...prevItems,
				{ ...productToAdd, quantity: productToAdd.quantity || 1 },
			];
		});
		toast.success(`${productToAdd.name} added to cart!`, {
			...toastOptions,
			toastId: `add-cart-${productToAdd.id}`,
		});
	};

	const removeFromCart = (productId) => {
		const removedItem = cartItems.find((item) => item.id === productId);
		if (removedItem) {
			toast.info(`${removedItem.name} removed from cart.`);
		}
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	};

	const updateCartQuantity = (productId, amount) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId
					? { ...item, quantity: Math.max(1, item.quantity + amount) }
					: item
			)
		);
	};

	const addToWishlist = (productToAdd) => {
		const existingItem = wishlistItems.find(
			(item) => item.id === productToAdd.id
		);
		if (existingItem) {
			toast.warn(`${productToAdd.name} is already in your wishlist!`, {
				toastId: `warn-wishlist-${productToAdd.id}`,
			});
			return;
		}
		setWishlistItems((prevItems) => [...prevItems, productToAdd]);
		toast.success("The product added in my list", {
			...toastOptions,
			toastId: `add-wishlist-${productToAdd.id}`,
		});
	};

	const removeFromWishlist = (productId) => {
		const removedItem = wishlistItems.find((item) => item.id === productId);
		if (removedItem) {
			toast.info(`${removedItem.name} removed from wishlist.`);
		}
		setWishlistItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	};
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

	const toggleSearchModal = () => {
		setIsSearchModalOpen((prevState) => !prevState);
	};
	const value = {
		isAuthenticated,
		login,
		logout,
		cartItems,
		wishlistItems,
		addToCart,
		removeFromCart,
		updateCartQuantity,
		addToWishlist,
		removeFromWishlist,
		isFilterSidebarOpen,
		toggleFilterSidebar,
		isSearchModalOpen,
		toggleSearchModal,
	};

	return (
		<GlobalStateContext.Provider value={value}>
			{children}
		</GlobalStateContext.Provider>
	);
};
