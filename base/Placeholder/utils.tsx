import type { ComponentData, JssProps, Placeholders, SitecoreContext, SitecorePage } from '@/lib/types'
import { getDynamicPlaceholderPattern, isDynamicPlaceholder } from '@sitecore-jss/sitecore-jss/layout'
import { MissingComponent } from '../MissingComponent'
import { PlaceholderMetadata } from './PlaceholderMetadata'

export const getPlaceholderDataFromRenderingData = (name: string, placeholders?: Placeholders) => {
	if (!placeholders) {
		console.warn(
			`Placeholder '${name}' was not found in the current rendering data`,
			JSON.stringify(placeholders, null, 2),
		)
		return null
	}

	if (placeholders[name]) {
		return placeholders[name]
	}

	const placeholderEntry = Object.entries(placeholders).find(([key]) => {
		const pattern = isDynamicPlaceholder(key) ? getDynamicPlaceholderPattern(key) : null
		return pattern?.test(name)
	})

	if (placeholderEntry) {
		const [, placeholder] = placeholderEntry
		return placeholder
	}

	return null
}

type TransformedComponentProps = {
	parentPlaceholderName: string
	componentData: ComponentData
	sitecoreContext: SitecoreContext
	serverData: SitecorePage
}

export const TransformedComponent: React.FC<TransformedComponentProps> = ({
	parentPlaceholderName,
	componentData,
	sitecoreContext,
	serverData,
}) => {
	const { componentName, params } = componentData

	let Component: React.ComponentType<JssProps> | null = null

	if (componentName) {
		Component = serverData.componentFactory(componentName, params?.FieldNames)
	}

	if (!Component) {
		console.error(
			`Placeholder ${parentPlaceholderName} contains unknown component ${componentName} ${params?.FieldNames}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`,
		)
		Component = MissingComponent
	}

	const props: JssProps = {
		componentData,
		sitecoreContext,
		serverData,
		// TODO replace with proper translation
		T: (key) => serverData.dictionary[key],
	}

	return (
		<PlaceholderMetadata
			uid={componentData.uid}
			placeholders={componentData.placeholders}
			editMode={sitecoreContext.editMode}
		>
			<Component {...props} />
		</PlaceholderMetadata>
	)
}
