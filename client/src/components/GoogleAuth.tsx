import { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { signInFailure, signInSuccess } from '../reducers/userSlice'
import { app } from '../firebase'
import toast from 'react-hot-toast'

const GoogleAuth = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleClick = async () => {
		try {
			setIsLoading(true)
			const provider = new GoogleAuthProvider()
			const auth = getAuth(app)
			const result = await signInWithPopup(auth, provider)

			if (result.user) {
				const res = await fetch('/api/auth/google', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: result.user.displayName,
						email: result.user.email,
						photo: result.user.photoURL,
					}),
				})

				const data = await res.json()

				if (data.success) {
					dispatch(signInSuccess(data))
					navigate('/')
				} else {
					toast.error(data.message)
					dispatch(signInFailure(data.message))
				}
			}
		} catch (error) {
			console.log(error)
			toast.error((error as Error)?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			disabled={isLoading}
			className='w-full my-2 py-3 px-6 bg-red-700 disabled:bg-red-400 rounded-lg text-center uppercase text-white'>
			Continue With Google
		</button>
	)
}

export default GoogleAuth
