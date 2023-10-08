import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
	signOutUserFailure,
	signOutUserStart,
	signOutUserSuccess,
} from '../reducers/userSlice'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

interface ModelProps {
	cancel: () => void
	proceed: () => void
}

const Model = ({ cancel, proceed }: ModelProps) => (
	<div className=' fixed top-0 left-0 right-0 h-screen z-50 flex justify-center items-center backdrop-blur-md bg-gray-900/10 dark:bg-gray-100/10'>
		<div className='p-10 max-w-lg bg-gray-100 dark:bg-gray-900 rounded-xl'>
			<h1 className='text-red-500 font-bold text-center text-xl'>
				{' '}
				Are you sure? <br className='md:hidden' /> you want to delete your
				account?{' '}
			</h1>

			<div className='mt-10 flex justify-end gap-4'>
				{/* Delete account */}
				<button
					onClick={proceed}
					className='w-full sm:w-fit py-2 px-4 bg-red-600 text-white rounded-lg font-medium'
					type='button'>
					Delete
				</button>

				{/* Cancel */}
				<button
					onClick={cancel}
					className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'
					type='button'>
					Cancel
				</button>
			</div>
		</div>
	</div>
)

const ProfilePage = () => {
	const [isModelOpen, setIsModelOpen] = useState(false)
	const { currentUser } = useAppSelector((state) => state.user)
	const auth = getAuth()
	const dispatch = useAppDispatch()

	useEffect(() => {
		document.body.style.overflow = isModelOpen ? 'hidden' : 'visible'
	}, [isModelOpen])

	const handleSignOut = () => {
		dispatch(signOutUserStart())
		signOut(auth)
			.then(() => {
				dispatch(signOutUserSuccess())
				// navigate('/')
			})
			.catch((error) => {
				dispatch(signOutUserFailure(error.message))
				toast.error(error.message)
			})
	}

	const handleDeleteAccount = () => {}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				{/* Heading */}
				<h1 className='mb-4 md:mb-8 text-3xl text-center font-semibold'>
					Profile
				</h1>

				<div className='flex flex-col items-center gap-6 md:gap-8'>
					{/* Profile */}
					<div className=''>
						<img
							src={currentUser?.avatar}
							alt={`${currentUser?.username} profile`}
							className='w-20 md:w-24 h-20 md:h-24 rounded-full'
						/>
					</div>

					{/* Name & email */}
					<div className='text-center '>
						<h2 className='text-xl font-medium mb-2'>
							{' '}
							{currentUser?.username}{' '}
						</h2>
						<p className='text-sm'> {currentUser?.email} </p>
					</div>

					{/* Buttons */}
					<div className='flex flex-wrap justify-center items-center gap-4'>
						{/* Edit */}
						<Link
							to='/edit-profile'
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 text-center rounded-lg font-medium'>
							{' '}
							Edit profile{' '}
						</Link>

						{/* Create Listing */}
						<Link
							to='/create-listing'
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 text-center rounded-lg font-medium'
							type='button'>
							{' '}
							Create listing{' '}
						</Link>

						{/* Sign Out */}
						<button
							onClick={handleSignOut}
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'
							type='button'>
							SignOut
						</button>

						{/* Delete account */}
						<button
							onClick={() => setIsModelOpen(true)}
							className='w-full sm:w-fit py-2 px-4 bg-red-600 text-white rounded-lg font-medium'
							type='button'>
							Delete
						</button>
					</div>
				</div>

				<div className=''>
					<h2 className='my-12 text-center text-2xl font-semibold'>
						{' '}
						Listings{' '}
					</h2>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'></div>
				</div>
			</div>

			{isModelOpen && (
				<Model
					proceed={handleDeleteAccount}
					cancel={() => setIsModelOpen(false)}
				/>
			)}
		</main>
	)
}

export default ProfilePage
