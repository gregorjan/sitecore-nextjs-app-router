import { ZodError, type ZodType, type z } from 'zod'
import { formatZodError } from './format-zod-error'

export const checkEnv = <T extends ZodType>(env: unknown, envSchema: T): z.infer<T> => {
	const { data, error } = envSchema.safeParse(env)

	if (!error) return data

	const message = formatZodError(error, 'Missing required environment variables:')
	console.error(message)
	throw new Error(message)
}
