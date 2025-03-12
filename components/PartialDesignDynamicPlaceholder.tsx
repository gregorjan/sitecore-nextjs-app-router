'use server'

import { Placeholder } from "@/base/Placeholder";
import type {
	ComponentFactory,
	ComponentRendering,
	EditMode,
	LayoutServiceData,
} from "@sitecore-jss/sitecore-jss-nextjs";

type DynamicPlaceholderProps = {
	rendering: ComponentRendering;
	layoutData: LayoutServiceData;
	componentFactory: ComponentFactory;
	editMode?: EditMode;
	pageEditing?: boolean;
};

const PartialDesignDynamicPlaceholder: React.FC<
	DynamicPlaceholderProps
> = async (props: DynamicPlaceholderProps) => {

	return (
		<Placeholder
			name={props.rendering?.params?.sig || ""}
			rendering={props.rendering}
			componentFactory={props.componentFactory}
			editMode={props.editMode}
			pageEditing={props.pageEditing}
		/>
	);
};

export default PartialDesignDynamicPlaceholder;
