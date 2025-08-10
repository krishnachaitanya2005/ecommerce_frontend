import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "40px",
			}}
		>
			<CircularProgress sx={{ color: "var(--primary-color)" }} />
		</Box>
	);
};

export default Loader;
