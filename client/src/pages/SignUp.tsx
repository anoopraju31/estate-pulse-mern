import { useEffect, useState } from 'react'
import { InputField } from '../components'
import { Link } from 'react-router-dom'
import { checkForm } from '../utils'

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

	useEffect(() => {
		setIsDisabled(
			!(
				checkForm('username', form.username) &&
				checkForm('email', form.email) &&
				checkForm('password', form.password)
			),
		)
	}, [form])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		setForm((prev) => ({ ...prev, [field]: e.target.value }))
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 px-4 flex flex-col'>
				<h1 className='text-3xl text-center font-semibold text-gray-900 dark:text-white py-4 md:py-8'>
					{' '}
					Sign Up{' '}
				</h1>

				<form className='w-full max-w-md mx-auto my-8'>
					{/* username input */}
					<InputField
						label='Username'
						name='username'
						type='text'
						placeholder='username'
						value={form.username}
						handleChange={(e) => handleChange(e, 'username')}
					/>

					{/* email input */}
					<InputField
						label='Email'
						name='email'
						type='email'
						placeholder='email'
						value={form.email}
						handleChange={(e) => handleChange(e, 'email')}
					/>

					{/* password input */}
					<InputField
						label='Password'
						name='password'
						type='password'
						placeholder='password'
						value={form.password}
						handleChange={(e) => handleChange(e, 'password')}
					/>

					<button
						disabled={isDisabled}
						className='w-full my-2 py-3 px-6 bg-green-500 disabled:bg-green-500/60 rounded-lg text-center uppercase text-white'>
						Sign Up
					</button>

					<button className='w-full my-2 py-3 px-6 bg-red-500 rounded-lg text-center uppercase text-white'>
						Sign Up With Google
					</button>
				</form>

				<div className='px-4'>
					<p className='text-gray-900 dark:text-white text-center'>
						already have an account?
						<Link to='/sign-in' className='text-red-500 hover:text-red-500/70'>
							{' '}
							Sign In{' '}
						</Link>
					</p>
				</div>
			</div>
		</main>
	)
}

export default SignUpPage
