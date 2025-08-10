import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./HeroBanner.css";

function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<FontAwesomeIcon icon={faChevronRight} />
		</div>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<FontAwesomeIcon icon={faChevronLeft} />
		</div>
	);
}

const HeroBanner = () => {
	const slides = [
		{
			image: "/assets/hero_banner/file_1734524878924_1721277298204_banner.jpg",
		},
		{
			image: "/assets/hero_banner/file_1734524930884_NewProject(6).jpg",
		},
		{
			image: "/assets/hero_banner/file_1734524971122_NewProject(8).jpg",
		},
		{
			image: "/assets/hero_banner/file_1734524985581_NewProject(11).jpg",
		},
		{
			image:
				"/assets/hero_banner/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg",
		},
		{
			image: "/assets/hero_banner/file_1734525014348_NewProject(7).jpg",
		},
	];

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: false,
				},
			},
		],
	};

	return (
		<section className="hero-banner-section">
			<Slider {...settings}>
				{slides.map((slide, index) => (
					<div key={index} className="slide-item">
						<img src={slide.image} alt={`Slide ${index + 1}`} />
					</div>
				))}
			</Slider>
		</section>
	);
};

export default HeroBanner;
