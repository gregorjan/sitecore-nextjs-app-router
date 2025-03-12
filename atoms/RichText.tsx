"use client";

import type { RichTextProps as ReactRichTextProps } from "@sitecore-jss/sitecore-jss-nextjs";
import { isFieldValueEmpty } from "@sitecore-jss/sitecore-jss/layout";
import { withFieldMetadata } from "./withFieldMetadata";

type RichTextProps = ReactRichTextProps;

export const RichText: React.FC<RichTextProps> =
	withFieldMetadata<RichTextProps>(
		({ field, tag = "div", ref, ...otherProps }: RichTextProps) => {
			if (!field || (!field.editable && isFieldValueEmpty(field))) {
				return null;
			}

			const props = {
				...otherProps,
				dangerouslySetInnerHTML: {
					__html: field?.value,
				},
			};
			const Comp: React.ElementType = tag;

			return <Comp {...props} />;
		},
	);
