import type { EditMode, Placeholders } from '@/lib/types'
import { DEFAULT_PLACEHOLDER_UID, MetadataKind } from '@sitecore-jss/sitecore-jss/editing'
import { getDynamicPlaceholderPattern, isDynamicPlaceholder } from '@sitecore-jss/sitecore-jss/layout'
import type { PropsWithChildren, ReactNode } from 'react'

type CodeBlockAttributes = {
	type: string
	chrometype: string
	className: string
	kind: string
	id: string
}

type MetadataCodeProps = {
	kind: MetadataKind
	chrometype: 'placeholder' | 'rendering'
	id: string
}

const MetadataCode: React.FC<MetadataCodeProps> = ({ id, kind, chrometype }) => {
	const attributes: CodeBlockAttributes = {
		type: 'text/sitecore',
		chrometype,
		className: 'scpm',
		kind,
		id,
	}

	return <code {...attributes} />
}

interface MetadataProps {
	id: string
	chrometype: 'placeholder' | 'rendering'
	children?: ReactNode
}

export const Metadata: React.FC<MetadataProps> = ({ id, chrometype, children }) => {
	return (
		<>
			<MetadataCode id={id} chrometype={chrometype} kind={MetadataKind.Open} />
			{children}
			<MetadataCode id={id} chrometype={chrometype} kind={MetadataKind.Close} />
		</>
	)
}

export const PlaceholderMetadata: React.FC<
	PropsWithChildren<{
		uid?: string
		name?: string
		editMode: EditMode
		placeholders: Placeholders
	}>
> = ({ uid = DEFAULT_PLACEHOLDER_UID, editMode, placeholders, name, children }) => {
	if (editMode === 'metadata') {
		let id = uid
		if (placeholders && name) {
			const matchedPlaceholder = Object.keys(placeholders).find(
				(placeholder) =>
					placeholder === name ||
					(isDynamicPlaceholder(placeholder) && getDynamicPlaceholderPattern(placeholder).test(name)),
			)

			if (matchedPlaceholder) {
				id = `${matchedPlaceholder}_${uid}`
			}
		}

		return (
			<Metadata key={uid || name} id={id} chrometype={name ? 'placeholder' : 'rendering'}>
				{children}
			</Metadata>
		)
	}

	return children
}
