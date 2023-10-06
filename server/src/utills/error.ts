interface ResponseError extends Error {
	statusCode?: number
}

export const errorHandler = (statusCode: number, message: string) => {
	const error: ResponseError = new Error()
	error.statusCode = statusCode
	error.message = message
	return error
}
