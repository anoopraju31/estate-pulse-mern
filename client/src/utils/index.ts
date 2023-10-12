// * regex patterns
const usernameRegex = /[A-Za-z ]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const checkForm = (
	label: 'username' | 'email' | 'password',
	value: string,
) => {
	if (label === 'username') {
		return usernameRegex.test(value)
	} else if (label === 'email') return emailPattern.test(value)
	else return value.length >= 8
}

export const removeDuplicates = (arr: (string | File)[]) => {
	const uniqueFiles = new Set()

	return arr.filter((file: string | File) => {
		if (!uniqueFiles.has(file)) {
			uniqueFiles.add(file)
			return true
		}
		return false
	})
}
