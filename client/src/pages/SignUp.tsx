import { useEffect, useState } from 'react'
import { GoogleAuth, InputField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { checkForm } from '../utils'
import toast, { Toaster } from 'react-hot-toast'

interface SignUpFormData {
	username: string
	email: string
	password: string
}

const SignUpPage = () => {
	const [form, setForm] = useState<SignUpFormData>({
		username: '',
		email: '',
		password: '',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		setIsDisabled(
			!(
				checkForm('username', form.username) &&
				checkForm('email', form.email) &&
				checkForm('password', form.password)
			),
		)
	}, [form])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setIsLoading(true)

			const res = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			const data = await res.json()
			console.log(data)

			setForm({
				username: '',
				email: '',
				password: '',
			})

			if (data.success) {
				navigate('/sign-in')
			} else toast.error(data.message)
		} catch (error) {
			console.log(error)

			toast.error((error as Error)?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 px-4 flex flex-col'>
				<h1 className='text-3xl text-center font-semibold text-gray-900 dark:text-white py-4 md:py-8'>
					{' '}
					Sign Up{' '}
				</h1>

				{/* Sign Up Form */}
				<form className='w-full max-w-md mx-auto my-8' onSubmit={handleSubmit}>
					{/* username input */}
					<InputField
						label='Username'
						name='username'
						type='text'
						placeholder='username'
						value={form.username}
						handleChange={(e) => handleChange(e)}
					/>

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
						{isLoading ? 'Loading ...' : 'Sign Up'}
					</button>

					{/* Google Sign Up Button */}
					<GoogleAuth />
				</form>

				{/* Link to Sign In Page */}
				<div className='px-4'>
					<p className='text-gray-900 dark:text-white text-center'>
						already have an account?
						<Link to='/sign-in' className='text-red-500 hover:text-red-500/70'>
							{' '}
							Sign In{' '}
						</Link>
					</p>
				</div>

				<Toaster position='top-center' />
			</div>
		</main>
	)
}

export default SignUpPage
