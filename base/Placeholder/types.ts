import type { ComponentProps } from "@/lib/types";
import type {
	ComponentRendering,
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
