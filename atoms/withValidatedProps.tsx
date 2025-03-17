import type React from 'react'
import type { ZodType, z } from 'zod'
import { formatZodError } from '@/lib/utils/format-zod-error'
import { DevError } from './DevError'

export function withValidatedProps<T extends ZodType>(schema: T) {
	return function withValidatedPropsHoc(Component: React.ComponentType<z.infer<T>>) {
		return function WithValidatedProps(props: z.infer<T>) {
			const { success, error, data } = schema.safeParse(props)

			if (!success) {
				console.error(formatZodError(error, `Component ${Component.displayName} is missing required props`))
				return <DevError pageState={props.sitecoreContext.pageState}>unexpected error check console for details</DevError>
			}

			return <Component {...data} />
		}
	}
}