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
		<div className="max-w-[500px] bg-orange-500 text-white p-2.5 text-base-white outline-6 outline-orange-600">
			<p>{errorMessage}</p>
		</div>
	);
};
