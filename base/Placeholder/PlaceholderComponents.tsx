import type { JssProps, Placeholders, SitecoreContext, SitecorePage } from '@/lib/types'
import { TransformedComponent, getPlaceholderDataFromRenderingData } from './utils'

export type PlaceholderProps = {
	uid?: string
	name: string
	componentData: { placeholders: Placeholders }
	sitecoreContext: SitecoreContext
	serverData: SitecorePage
}

export const PlaceholderComponents = ({
	name,
	sitecoreContext,
	componentData,
	serverData,
}: PlaceholderProps): React.ReactElement<JssProps>[] | null => {
	const placeholderData = getPlaceholderDataFromRenderingData(name, componentData.placeholders)

	if (!placeholderData) return null

	return placeholderData
		.map((componentData) => {
			return (
				<TransformedComponent
					key={componentData.uid}
					parentPlaceholderName={name}
					componentData={componentData}
					sitecoreContext={sitecoreContext}
					serverData={serverData}
				/>
			)
		})
		.filter(Boolean)
}
