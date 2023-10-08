import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	signOutUserFailure,
	signOutUserStart,
	signOutUserSuccess,
	updateUserFailure,
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
	const { currentUser, loading } = useAppSelector((state) => state.user)
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

	const handleDeleteAccount = async () => {
		try {
			dispatch(deleteUserStart())
			setIsModelOpen(false)

			const res = await fetch(`/api/user/delete/${currentUser?.id}`, {
				method: 'DELETE',
			})
			const data = await res.json()

			if (!data?.success) {
				dispatch(updateUserFailure(data.message))
				toast.error(data?.message)
				return
			}

			dispatch(deleteUserSuccess(data))
		} catch (error) {
			dispatch(deleteUserFailure((error as Error)?.message))
			console.error(error)
			toast.error((error as Error)?.message)
		}
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			{/* Breadcrumb */}
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				<nav className='my-4 flex' aria-label='Breadcrumb'>
					<ol className='inline-flex items-center space-x-1 md:space-x-3'>
						<li className='inline-flex items-center'>
							<Link
								to='/'
								className='inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
								<AiFillHome />
								Home
							</Link>
						</li>
						<li aria-current='page'>
							<div className='flex items-center text-gray-500 md:ml-2 dark:text-gray-400'>
								<IoIosArrowForward />
								<span className='ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400'>
									Profile
								</span>
							</div>
						</li>
					</ol>
				</nav>
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
							to='/profile/edit'
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
							{loading ? 'Deleting...' : 'Delete'}
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
