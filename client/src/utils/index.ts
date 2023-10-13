import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'

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

// Funtion to remove duplicate images
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

// Uploading images to firebase
export const uploadImages = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const storage = getStorage(app)
		const fileName = new Date().getTime() + file.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log(`Upload is ${progress}% done`)
			},
			(error) => {
				reject(error)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL)
				})
			},
		)
	})
}

// Delete images from firebase
export const deleteImage = (fileUrl: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const storage = getStorage(app)
		const fileRef = ref(storage, fileUrl)

		deleteObject(fileRef)
			.then(() => {
				console.log('file deleted successfully')
				resolve('file deleted successfully')
			})
			.catch((error) => {
				console.log(error)
				reject(error.message)
			})
	})
}
