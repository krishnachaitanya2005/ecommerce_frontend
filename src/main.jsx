import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalStateProvider } from "./context/GlobalStateContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/variables.css";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalStateProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GlobalStateProvider>
	</React.StrictMode>
);
