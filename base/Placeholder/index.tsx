import type { ComponentRendering } from "@sitecore-jss/sitecore-jss/layout";
import type { PlaceholderProps } from "./types";
import {
	Metadata,
	TransformedComponent,
	getPlaceholderDataFromRenderingData,
} from "./utils";

export const Placeholder: React.FC<PlaceholderProps> = (props) => {
	const placeholderData = getPlaceholderDataFromRenderingData(
		props.rendering,
		props.name,
	);

	let transformedComponents = placeholderData
		.map((rendering, index) => {
			const component = (
				<TransformedComponent
					{...props}
					key={rendering.uid}
					rendering={rendering}
				/>
			);

			if (props.renderEach) {
				return props.renderEach(component, index);
			}

			return component;
		})
		.filter(Boolean);

	if (props.render && transformedComponents?.length) {
		transformedComponents = props.render(
			transformedComponents,
			placeholderData,
			props,
		);
	}

	return (
		<Metadata
			rendering={props.rendering as ComponentRendering}
			name={props.name}
			editMode={props.editMode}
		>
			{transformedComponents}
		</Metadata>
	);
};
