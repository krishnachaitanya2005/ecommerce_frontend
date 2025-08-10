import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import HomeCategories from "../components/home/HomeCategories";
import PopularProducts from "../components/home/PopularProducts";
import OfferBanners from "../components/home/OfferBanners";
import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {
	return (
		<div className="home-page">
			<div className="container">
				<HeroBanner />
			</div>
			<HomeCategories />
			<PopularProducts />
			<OfferBanners />
			<FeaturedProducts />
		</div>
	);
};

export default Home;
