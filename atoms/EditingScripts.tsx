import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing'
import Script from 'next/script'

type Props = {
	clientData?: Record<string, Record<string, unknown>>
	clientScripts?: string[]
}

export const EditingScripts: React.FC<Props> = ({ clientData, clientScripts }) => {
	const jssClientData = { ...clientData, ...getJssPagesClientData() }
	return (
		<>
			{clientScripts?.map((src) => (
				<Script src={src} key={src} />
			))}
			{Object.keys(jssClientData).map((id) => (
				<Script
					key={id}
					id={id}
					type="application/json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml:
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jssClientData[id]),
					}}
				/>
			))}
		</>
	)
}
