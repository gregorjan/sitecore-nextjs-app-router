import type { ZodError } from 'zod'

export const formatZodError = (error: ZodError, message = 'Missing required values') => {
	const issues = error.issues.map((issue) => issue.path[0])
	return `${message} ${issues.join(', ')}`
}
