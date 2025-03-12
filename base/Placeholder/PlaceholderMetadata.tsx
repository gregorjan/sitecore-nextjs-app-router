import { DEFAULT_PLACEHOLDER_UID, MetadataKind } from '@sitecore-jss/sitecore-jss/editing'
import {
	type ComponentRendering,
	type RouteData,
	getDynamicPlaceholderPattern,
	isDynamicPlaceholder,
} from '@sitecore-jss/sitecore-jss/layout'
import type { ReactNode } from 'react'

interface PlaceholderMetadataProps {
	rendering: ComponentRendering
	placeholderName?: string
	children?: ReactNode
}

type CodeBlockAttributes = {
	type: string
	chrometype: string
	className: string
	kind: string
	id?: string
}

type MetadataCodeProps = {
	rendering: ComponentRendering | RouteData
	kind: MetadataKind
	placeholderName?: string
}

const MetadataCode: React.FC<MetadataCodeProps> = ({ rendering, kind, placeholderName }) => {
	const { uid, placeholders } = rendering as ComponentRendering
	const chrometype = placeholderName ? 'placeholder' : 'rendering'

	const attributes: CodeBlockAttributes = {
		type: 'text/sitecore',
		chrometype,
		className: 'scpm',
		kind,
		id: uid || DEFAULT_PLACEHOLDER_UID,
	}

	if (placeholders && kind === MetadataKind.Open && chrometype === 'placeholder' && placeholderName) {
		const matchedPlaceholder = Object.keys(placeholders).find(
			(placeholder) =>
				placeholder === placeholderName ||
				(isDynamicPlaceholder(placeholder) && getDynamicPlaceholderPattern(placeholder).test(placeholderName)),
		)

		if (matchedPlaceholder) {
			attributes.id = `${matchedPlaceholder}_${attributes.id}`
		}
	}

	return <code {...attributes} />
}

export const PlaceholderMetadata = ({
	rendering,
	placeholderName,
	children,
}: PlaceholderMetadataProps) => {
	return (
		<>
			<MetadataCode rendering={rendering} placeholderName={placeholderName} kind={MetadataKind.Open} />
			{children}
			<MetadataCode rendering={rendering} placeholderName={placeholderName} kind={MetadataKind.Close} />
		</>
	)
}
