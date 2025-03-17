import { DevError } from '@/atoms/DevError'
import type { JssProps } from '@/lib/types'

export const MissingComponent: React.FC<JssProps> = ({ componentData, sitecoreContext }) => {
	const componentName = componentData?.componentName ?? 'Unnamed Component'
	const variantName = componentData?.params?.FieldNames

	const errorMessage = `JSS component ${componentName} variant ${variantName || 'Default'} is missing React implementation. See the developer console for more information.`
	return <DevError pageState={sitecoreContext.pageState}>{errorMessage}</DevError>
}
