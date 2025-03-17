import { z } from 'zod'

export type NextPageProps = {
	searchParams: Promise<unknown>
	params: Promise<{ locale: string; path: string[] }>
}

export const JsonValueSchema = z.object({
	jsonValue: z
		.object({
			value: z.string().optional(),
		})
		.passthrough(),
})

export type JsonValue = z.infer<typeof JsonValueSchema>

export const ParamsSchema = z.object({
	sig: z.string().optional(),
	FieldNames: z.string().optional(),
	RenderingIdentifier: z.string().optional(),
	DynamicPlaceholderId: z.string().optional(),
})
export type Params = z.infer<typeof ParamsSchema>

const EditModeSchema = z.enum(['chromes', 'metadata']).nullable()
export type EditMode = z.infer<typeof EditModeSchema>

const PageStateSchema = z.enum(['preview', 'edit', 'normal']).nullable()
export type PageState = z.infer<typeof PageStateSchema>

const PageEditingSchema = z.boolean().nullable()
export type PageEditing = z.infer<typeof PageEditingSchema>

const DictionarySchema = z.record(z.string(), z.string())
export type Dictionary = z.infer<typeof DictionarySchema>

export const ComponentFactorySchema = z.function().args(z.string(), z.string().optional()).returns(z.any())

export type ComponentFactory = z.infer<typeof ComponentFactorySchema>

export const ComponentDataSchema = z.object({
	uid: z.string(),
	componentName: z.string(),
	dataSource: z.string(),
	params: ParamsSchema,
	fields: z.unknown(),
	placeholders: z.unknown(),
})

export type ComponentData = z.infer<typeof ComponentDataSchema> & {
	placeholders: Placeholders
}

const SitecoreContextSchema = z.object({
	pageEditing: PageEditingSchema,
	editMode: EditModeSchema,
	pageState: PageStateSchema,
})

export type SitecoreContext = z.infer<typeof SitecoreContextSchema>

const ServerDataSchema = z.object({
	route: z.unknown(),
	componentFactory: ComponentFactorySchema,
	dictionary: DictionarySchema,
})

export type SitecorePage = z.infer<typeof ServerDataSchema>

export type Placeholders = Record<string, ComponentData[]> | null

const TSchema = z.function().args(z.string()).returns(z.string())
export type TFunction = z.infer<typeof TSchema>

export const JssPropsSchema = z.object({
	componentData: ComponentDataSchema,
	sitecoreContext: SitecoreContextSchema,
	serverData: ServerDataSchema,
	T: TSchema,
})

export type JssProps = z.infer<typeof JssPropsSchema> & {
	componentData: { placeholders: Placeholders }
}

export const JssDatasourcePropsSchema = JssPropsSchema.extend({
	componentData: ComponentDataSchema.extend({
		fields: z.object({
			data: z.object({
				datasource: z.unknown(),
			}),
		}),
	}),
})

export type JssDatasourceProps = z.infer<typeof JssDatasourcePropsSchema> & {
	placeholders: Placeholders
}
