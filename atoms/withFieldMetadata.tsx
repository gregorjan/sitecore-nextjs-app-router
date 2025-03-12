import React, { type ComponentType, forwardRef } from "react";
import { FieldMetadata } from "./FieldMetadata";

type WithMetadataProps = {
	field?: {
		metadata?: { [key: string]: unknown };
	};
	editable?: boolean;
};

export const withFieldMetadata = <
	FieldComponentProps extends WithMetadataProps,
>(
	FieldComponent: ComponentType<FieldComponentProps>,
) => {
	return (props: FieldComponentProps) => {
		const { editable = true } = props;
		const metadata = props.field?.metadata;

		if (!metadata || !editable) {
			return <FieldComponent {...props} />;
		}

		return (
			<FieldMetadata metadata={metadata}>
				<FieldComponent {...props} />
			</FieldMetadata>
		);
	};
};
