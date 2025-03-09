'use client'

import { Placeholder } from "@/base/Placeholder";
import type {
	ComponentRendering,
	LayoutServiceData,
} from "@sitecore-jss/sitecore-jss-nextjs";

type DynamicPlaceholderProps = {
	rendering: ComponentRendering;
	layoutData: LayoutServiceData;
};

const PartialDesignDynamicPlaceholder = (
	props: DynamicPlaceholderProps,
): JSX.Element => {
	return (
		<Placeholder
			name={props.rendering?.params?.sig || ""}
			rendering={props.rendering}
		/>
	);
};

export default PartialDesignDynamicPlaceholder;
