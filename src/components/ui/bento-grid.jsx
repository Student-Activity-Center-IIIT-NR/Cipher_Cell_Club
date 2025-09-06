export const BentoGrid = ({ className = "", children }) => {
	return <div className={`bento-grid ${className}`}>{children}</div>;
};

export const BentoGridItem = ({
	className = "",
	title,
	description,
	date,
	style = {},
}) => {
	return (
		<div className={`bento-grid-item ${className}`} style={style}>
			<div
				className="bento-content"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					height: "100%",
					padding: "0rem",
				}}
			>
				<div className="bento-title">{title}</div>
				{/* <div className="bento-description">{description}</div> */}
				<div className="bento-description">{date}</div>
			</div>
		</div>
	);
};
