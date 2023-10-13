import { getStorage, ref, deleteObject } from 'firebase/storage'

import { app } from '../firebase'

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
