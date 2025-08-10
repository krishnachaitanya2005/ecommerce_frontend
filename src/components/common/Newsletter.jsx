import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
	return (
		<section className="newsletter-section">
			<div className="newsletter-container container">
				<div className="newsletter-content">
					<h2>
						Stay home & get your daily <br /> needs from our shop
					</h2>
					<p>Start Your'r Daily Shopping with Nest Mart</p>
					<form className="newsletter-form">
						<input type="email" placeholder="Your email address" />
						<button type="submit">Subscribe</button>
					</form>
				</div>
				<div className="newsletter-image">
					<img src="/assets/newsletter/newsletter.png" />
				</div>
			</div>
		</section>
	);
};

export default Newsletter;
