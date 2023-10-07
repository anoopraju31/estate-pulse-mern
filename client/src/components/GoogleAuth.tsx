import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { signInSuccess } from '../reducers/userSlice'
import { app } from '../firebase'

const GoogleAuth = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleClick = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const auth = getAuth(app)
			const result = await signInWithPopup(auth, provider)
			console.log(result)

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

				dispatch(signInSuccess(data))

				navigate('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			className='w-full my-2 py-3 px-6 bg-red-700 rounded-lg text-center uppercase text-white'>
			Continue With Google
		</button>
	)
}

export default GoogleAuth
