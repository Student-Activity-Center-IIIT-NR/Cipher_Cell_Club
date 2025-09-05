export const BentoGrid = ({ className = "", children }) => {
	return <div className={`bento-grid ${className}`}>{children}</div>;
};

export const BentoGridItem = ({
	className = "",
	title,
	description,
	header,
	icon,
	style = {},
}) => {
	return (
		<div className={`bento-grid-item ${className}`} style={style}>
			{header}
			<div className="bento-content">
				<div className="bento-icon">{icon}</div>
				<div className="bento-title">{title}</div>
				<div className="bento-description">{description}</div>
			</div>
		</div>
	);
};
