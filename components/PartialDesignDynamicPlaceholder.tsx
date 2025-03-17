import { PlaceholderComponents } from '@/base/Placeholder/PlaceholderComponents'
import { PlaceholderMetadata } from '@/base/Placeholder/PlaceholderMetadata'
import type { JssProps } from '@/lib/types'

const DynamicPlaceholder: React.FC<JssProps> = ({ componentData, sitecoreContext, serverData }) => {
	const name = componentData.params?.sig || ''
	return (
		<PlaceholderMetadata name={name} editMode={sitecoreContext.editMode} placeholders={componentData.placeholders}>
			<PlaceholderComponents
				name={name}
				sitecoreContext={sitecoreContext}
				serverData={serverData}
				componentData={componentData}
			/>
		</PlaceholderMetadata>
	)
}

export const Default = DynamicPlaceholder
