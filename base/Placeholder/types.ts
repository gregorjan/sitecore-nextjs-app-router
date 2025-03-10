import type { ComponentProps } from "@/lib/types";
import type { ComponentFactory } from "@sitecore-jss/sitecore-jss-nextjs";
import type {
	ComponentRendering,
	EditMode,
	Field,
	Item,
	RouteData,
} from "@sitecore-jss/sitecore-jss/layout";

export interface PlaceholderProps {
	name: string;
	rendering: ComponentRendering | RouteData;
	fields?: {
		[name: string]: Field | Item[];
	};
	params?: {
		[name: string]: string;
	};
	modifyComponentProps?: ModifyComponentProps;
	render?: Render;
	renderEach?: RenderEach;
	editMode?: EditMode;
	pageEditing?: boolean;
	componentFactory: ComponentFactory
}

export type ModifyComponentProps = (
	componentProps: ComponentProps,
) => ComponentProps;
export type Render = (
	components: React.ReactNode[],
	data: ComponentRendering[],
	props: PlaceholderProps,
) => React.ReactNode[];
export type RenderEach = (
	component: React.ReactNode,
	index: number,
) => React.ReactNode;
