import { useEffect, useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { InputField } from '../components'
import { Link } from 'react-router-dom'
import { checkForm } from '../utils'

interface updateFormData {
	username: string
	email: string
	password: string
	avatar: File | null
}

const EditProfilePage = () => {
	const [form, setForm] = useState<updateFormData>({
		username: '',
		email: '',
		password: '',
		avatar: null,
	})
	const [isDisabled, setIsDisabled] = useState(false)

	useEffect(() => {
		setIsDisabled(
			!(
				checkForm('username', form.username) ||
				checkForm('email', form.email) ||
				checkForm('password', form.password) ||
				form.avatar !== null
			),
		)
	}, [form])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.id]:
				e.target.id === 'avatar'
					? ((e.target as HTMLInputElement).files as FileList)[0]
					: e.target.value,
		}))
	}

	const handleClear = () => {
		setForm({
			username: '',
			email: '',
			password: '',
			avatar: null,
		})
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-lg min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				{/* Heading */}
				<h1 className='mb-4 md:mb-8 text-3xl text-center font-semibold'>
					Edit Profile
				</h1>

				<form className='my-6 flex flex-col md:flex-row md:gap-6'>
					{/* Left - Section */}
					<div className=' flex flex-col gap-4 items-center'>
						<h2 className='text-lg font-medium'> Profile Picture </h2>

						{/* Profile Image Preview + Image Input */}
						<div className='relative group cursor-pointer'>
							<img
								src={
									form.avatar
										? window.URL.createObjectURL(form.avatar)
										: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
								}
								alt='profile picture'
								className='w-36 sm:w-36 md:w-44 lg:w-52 h-36 sm:h-36 md:h-44 lg:h-52 rounded-full object-cover'
							/>

							<div>
								<label
									className='w-36 sm:w-36 md:w-44 lg:w-52 h-36 sm:h-36 md:h-44 lg:h-52 rounded-full cursor-pointer bg-green-500/70 absolute top-0 left-0 right-0 flex items-center invisible group-hover:visible transition-colors ease-in-out duration-500'
									htmlFor='avatar'>
									<p className='text-center text-xs'>
										{' '}
										Change your profile picture.{' '}
									</p>
									<input
										type='file'
										id='avatar'
										onChange={(e) => handleChange(e)}
										className='hidden'
									/>
								</label>
							</div>
						</div>

						<figure className='max-w-md p-2 lg:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border border-gray-300 dark:border-gray-600'>
							<figcaption>
								<p className='text-sm'>
									<AiFillWarning className='inline text-base mr-1' />
									This photo will appear on the platform, in your contributions
									or where it is mentioned.
								</p>
							</figcaption>
						</figure>
					</div>

					{/* Right Section */}
					<div className='w-full max-w-md mx-auto my-4 md:my-8'>
						{/* username */}
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

						{/* buttons */}
						<div className='flex flex-col sm:flex-row justify-between gap-4'>
							{/* Clear Button */}
							<button
								disabled={isDisabled}
								type='reset'
								onClick={handleClear}
								className='w-full py-3 px-6 bg-red-500 disabled:bg-red-500/60 rounded-lg text-center uppercase text-white font-medium'>
								Clear
							</button>

							{/* Cancel Button */}
							<Link
								to='/profile'
								type='button'
								className='w-full py-3 px-6 bg-gray-900 dark:bg-white disabled:bg-green-500/60 rounded-lg text-center uppercase text-white dark:text-gray-900 font-medium'>
								Cancel
							</Link>

							{/* Save Button */}
							<button
								disabled={isDisabled}
								type='submit'
								className='w-full py-3 px-6 bg-green-500 disabled:bg-green-500/60 rounded-lg text-center uppercase text-white font-medium'>
								Save
							</button>
						</div>
					</div>
				</form>
			</section>
		</main>
	)
}

export default EditProfilePage
