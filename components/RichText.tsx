import { RichText as RichTextAtom } from "@/atoms/RichText";

export type RichTextProps = {
	fields: {
		data: {
			datasource: {
				text: {
					jsonValue: {
						value: string;
					};
				};
			};
		};
	};
	rendering: {
		uid: string;
	};
	params: {
		RenderingIdentifier: string;
	};
};

const RichText: React.FC<RichTextProps> = async (props) => {
	const { datasource } = props?.fields?.data ?? {};

	const text = datasource?.text?.jsonValue;

	const uniqueId = props.rendering?.uid;
	const anchorId = props.params?.RenderingIdentifier;

	return (
		<div key={uniqueId} id={anchorId || uniqueId}>
			<RichTextAtom field={text} />
		</div>
	);
};

export const Default = RichText;
