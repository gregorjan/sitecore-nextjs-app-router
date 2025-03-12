import { z } from "zod";

export const PreviewSearchParamsSchema = z.object({
	sc_site: z.string(),
	sc_itemid: z.string(),
	sc_lang: z.string(),
	sc_variant: z.string().default("_default"),
	sc_layoutKind: z.string(),
	sc_version: z.string().optional(),
	secret: z.string(),
	mode: z.enum(["edit"]),
});

export type PreviewSearchParams = z.infer<typeof PreviewSearchParamsSchema>;
