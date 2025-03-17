import type {
	DictionaryPhrases,
	LayoutServiceData,
} from "@sitecore-jss/sitecore-jss-nextjs";
import { componentBuilder } from "@/components/builder";
import { PlaceholderComponents } from "./Placeholder/PlaceholderComponents";
import { PlaceholderMetadata } from "./Placeholder/PlaceholderMetadata";

import type { Placeholders } from "@/lib/types";
interface LayoutProps {
	layoutData: LayoutServiceData;
	dictionary: DictionaryPhrases;
	locale: string
}

const HEADER_KEY = "-header";
const FOOTER_KEY = "-footer";

export const PageLayout: React.FC<LayoutProps> = ({
	layoutData,
	dictionary,
}) => {
	const { route, context } = layoutData.sitecore;
	const { pageEditing, editMode, pageState } = context;
	const componentFactory = componentBuilder.getComponentFactory();

	const { headerPlaceholders, mainPlaceholders, footerPlaceholders } =
		Object.entries(route?.placeholders ?? {}).reduce(
			(acc, [placeholderKey, placeholderValue]) => {
				const key = placeholderKey.toLowerCase();
				const placeholders = {
					[placeholderKey]: placeholderValue,
				} as Placeholders;

				const placeholder = (
					<PlaceholderMetadata
						key={key}
						editMode={editMode || null}
						name={placeholderKey}
						placeholders={placeholders}
					>
						<PlaceholderComponents
							name={placeholderKey}
							componentData={{
								placeholders,
							}}
							sitecoreContext={{
								editMode: editMode || null,
								pageEditing: pageEditing || null,
								pageState: pageState || null,
							}}
							serverData={{
								route: route,
								componentFactory: componentFactory,
								dictionary: dictionary,
							}}
						/>
					</PlaceholderMetadata>
				);

				if (key.endsWith(HEADER_KEY)) {
					acc.headerPlaceholders.push(placeholder);
					return acc;
				}
				if (key.endsWith(FOOTER_KEY)) {
					acc.footerPlaceholders.push(placeholder);
					return acc;
				}

				acc.mainPlaceholders.push(placeholder);
				return acc;
			},
			{
				headerPlaceholders: [] as React.JSX.Element[],
				mainPlaceholders: [] as React.JSX.Element[],
				footerPlaceholders: [] as React.JSX.Element[],
			},
		);

	return (
		<>
			{route && (
				<>
					{headerPlaceholders}
					<main>{mainPlaceholders}</main>
					{footerPlaceholders}
				</>
			)}
		</>
	);
};
