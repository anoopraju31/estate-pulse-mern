import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { GoogleAuth, InputField } from '../components'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
	signInFailure,
	signInStart,
	signInSuccess,
} from '../reducers/userSlice'
import { checkForm } from '../utils'

interface SignUpFormData {
	email: string
	password: string
}

const SignInPage = () => {
	const [form, setForm] = useState<SignUpFormData>({
		email: '',
		password: '',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const isLoading = useAppSelector((state) => state.user.loading)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		setIsDisabled(
			!(checkForm('email', form.email) && checkForm('password', form.password)),
		)
	}, [form])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault()

		try {
			dispatch(signInStart())

			const res = await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			const data = await res.json()
			// console.log(data)

			// Clear Form
			setForm({
				email: '',
				password: '',
			})

			if (data.success) {
				dispatch(signInSuccess(data))
				navigate('/')
			} else {
				dispatch(signInFailure(data.message))
				toast.error(data.message)
			}
		} catch (error) {
			console.log(error)
			if (error instanceof Error) {
				dispatch(signInFailure(error?.message))
				toast.error(error?.message)
			}
		}
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 px-4 flex flex-col'>
				<h1 className='text-3xl text-center font-semibold text-gray-900 dark:text-white py-4 md:py-8'>
					{' '}
					Sign In{' '}
				</h1>

				{/* Sign In Form */}
				<form className='w-full max-w-md mx-auto my-8' onSubmit={handleSubmit}>
					{/* email input */}
					<InputField
						label='Email'
						name='email'
						type='email'
						placeholder='email'
						value={form.email}
						handleChange={(e) => handleChange(e)}
					/>

					{/* password input */}
					<InputField
						label='Password'
						name='password'
						type='password'
						placeholder='password'
						value={form.password}
						handleChange={(e) => handleChange(e)}
					/>

					{/* Submit Button */}
					<button
						disabled={isDisabled}
						className='w-full my-2 py-3 px-6 bg-green-500 disabled:bg-green-500/60 rounded-lg text-center uppercase text-white'>
						{isLoading ? 'Loading ...' : 'Sign In'}
					</button>

					{/* Google Sign Up Button */}
					<GoogleAuth />
				</form>

				{/* Link to Sign In Page */}
				<div className='px-4'>
					<p className='text-gray-900 dark:text-white text-center'>
						Dont have an account?
						<Link to='/sign-up' className='text-red-500 hover:text-red-500/70'>
							{' '}
							Sign Up{' '}
						</Link>
					</p>
				</div>

				<Toaster position='top-center' />
			</div>
		</main>
	)
}

export default SignInPage
