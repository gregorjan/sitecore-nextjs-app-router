import { MetadataKind } from "@sitecore-jss/sitecore-jss/editing";

type FieldMetadataProps = {
	metadata: { [key: string]: unknown };
	children: React.ReactNode;
}

export const FieldMetadata = (props: FieldMetadataProps): JSX.Element => {
	const data = JSON.stringify(props.metadata);
	const attributes = {
		type: "text/sitecore",
		chrometype: "field",
		className: "scpm",
	};
	const codeOpenAttributes = { ...attributes, kind: MetadataKind.Open };
	const codeCloseAttributes = { ...attributes, kind: MetadataKind.Close };

	return (
		<>
			<code {...codeOpenAttributes}>{data}</code>
			{props.children}
			<code {...codeCloseAttributes} />
		</>
	);
};
