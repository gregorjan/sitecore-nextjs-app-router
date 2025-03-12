import { MissingComponent } from "../MissingComponent";

import type { ComponentFactory } from "@sitecore-jss/sitecore-jss-nextjs";
import {
	type ComponentRendering,
	EditMode,
	type RouteData,
	getDynamicPlaceholderPattern,
	isDynamicPlaceholder,
} from "@sitecore-jss/sitecore-jss/layout";
import type { ComponentType, PropsWithChildren } from "react";
import type { ModifyComponentProps } from "./types";
import type { ComponentProps } from "@/lib/types";
import { PlaceholderMetadata } from "./PlaceholderMetadata";

export const getPlaceholderDataFromRenderingData = (
	rendering: ComponentRendering | RouteData,
	name: string,
): ComponentRendering[] => {
	const { placeholders } = rendering;
	if (!placeholders) {
		console.warn(
			`Placeholder '${name}' was not found in the current rendering data`,
			JSON.stringify(rendering, null, 2),
		);
		return [];
	}

	if (placeholders[name]) {
		return placeholders[name] as ComponentRendering[];
	}

	const placeholderEntry = Object.entries(placeholders).find(([key]) => {
		const pattern = isDynamicPlaceholder(key)
			? getDynamicPlaceholderPattern(key)
			: null;
		return pattern?.test(name);
	});

	if (placeholderEntry) {
		const [, placeholder] = placeholderEntry;
		return placeholder as ComponentRendering[];
	}

	return [];
};

export const Metadata: React.FC<
	PropsWithChildren<{
		rendering: ComponentRendering;
		name?: string;
		editMode?: EditMode;
	}>
> = ({ children, rendering, name, editMode }) => {
	if (editMode === EditMode.Metadata) {
		return (
			<PlaceholderMetadata
				key={rendering.uid || name}
				placeholderName={name}
				rendering={rendering}
			>
				{children}
			</PlaceholderMetadata>
		);
	}

	return children;
};

export const TransformedComponent: React.FC<{
	name: string;
	rendering: ComponentRendering;
	componentFactory: ComponentFactory;
	modifyComponentProps?: ModifyComponentProps;
	editMode?: EditMode;
}> = ({ rendering, componentFactory, name, editMode, modifyComponentProps }) => {
	const componentRendering = rendering;

	let Component: React.ComponentType | null = null;

	if (componentRendering.componentName) {
		Component = componentFactory(
			componentRendering.componentName,
			componentRendering.params?.FieldNames,
		);
	}

	if (!Component) {
		console.error(
			`Placeholder ${name} contains unknown component ${componentRendering.componentName} ${componentRendering.params?.FieldNames}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`,
		);
		Component = MissingComponent;
	}

	let finalProps = {
		fields: componentRendering.fields,
		params: componentRendering.params,
		rendering,
		componentFactory,
		editMode,
	} as ComponentProps;

	if (modifyComponentProps) {
		finalProps = modifyComponentProps(finalProps)
	}

	return (
		<Metadata
			editMode={editMode}
			rendering={componentRendering as ComponentRendering}

		>
			<Component key={componentRendering.uid} {...finalProps} />
		</Metadata>
	);
};
