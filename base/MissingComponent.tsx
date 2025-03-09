export type MissingComponentProps = {
	rendering?: {
		componentName?: string;
		params?: Record<string, string>;
	};
};

export const MissingComponent: React.FC<MissingComponentProps> = (props) => {
	const componentName = props.rendering?.componentName ?? "Unnamed Component";
	const variantName = props?.rendering?.params?.FieldNames;

	// error override would mean component is not unimplemented
	const errorMessage = `JSS component ${componentName} variant ${variantName} is missing React implementation. See the developer console for more information.`;
	return (
		<div
			style={{
				background: "darkorange",
				outline: "5px solid orange",
				padding: "10px",
				color: "white",
				maxWidth: "500px",
			}}
		>
			<p>{errorMessage}</p>
		</div>
	);
};
