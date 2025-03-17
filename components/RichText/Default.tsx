import { RichText as RichTextAtom } from "@/atoms/RichText";
import { withValidatedProps } from "@/atoms/withValidatedProps";
import { JsonValueSchema, ComponentDataSchema, JssDatasourcePropsSchema } from "@/lib/types";
import { z } from "zod";

export const RichTextSchema = JssDatasourcePropsSchema.extend({
	componentData: ComponentDataSchema.extend({
		fields: z.object({
			data: z.object({
				datasource: z.object({
					text: JsonValueSchema,
				}),
			}),
		}),
	}),
})

export default withValidatedProps(RichTextSchema)(
	({componentData}) => {
		const { datasource } = componentData.fields.data
	
		const text = datasource?.text?.jsonValue;
	
		const uniqueId = componentData?.uid;
		const anchorId = componentData.params?.RenderingIdentifier;
	
		return (
			<div key={uniqueId} id={anchorId || uniqueId}>
				<RichTextAtom field={text} />
			</div>
		);
	}
)
