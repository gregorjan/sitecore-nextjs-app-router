'use server'

import type {
	DictionaryPhrases,
	LayoutServiceData,
	RouteData,
} from "@sitecore-jss/sitecore-jss-nextjs";
import { componentBuilder } from "@/components/builder";
import { Placeholder } from "./Placeholder";

interface LayoutProps {
	layoutData: LayoutServiceData;
	dictionary: DictionaryPhrases;
}

const HEADER_KEY = "-header";
const FOOTER_KEY = "-footer";



const Layout: React.FC<LayoutProps> = async ({ layoutData, dictionary }) => {
	const { route, context } = layoutData.sitecore;
	const { pageEditing, editMode } = context;
	const componentFactory = componentBuilder.getComponentFactory();

	const { headerPlaceholders, mainPlaceholders, footerPlaceholders } =
		Object.keys(route?.placeholders ?? {}).reduce(
			(acc, placeholderKey) => {
				const key = placeholderKey.toLowerCase();

				const placeholder = (
					<Placeholder
						key={placeholderKey}
						name={placeholderKey}
						rendering={route as RouteData}
						editMode={editMode}
						pageEditing={pageEditing}
						componentFactory={componentFactory}
					/>
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
					{/* {headerPlaceholders} */}
					<main>{mainPlaceholders}</main>
					{/* {footerPlaceholders} */}
				</>
			)}
		</>
	);
};

export default Layout;
