import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const ProfilePage = () => {
	const { currentUser } = useAppSelector((state) => state.user)
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
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'>
							{' '}
							Edit profile{' '}
						</Link>

						{/* Create Listing */}
						<Link
							to='/create-listing'
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'
							type='button'>
							{' '}
							Create listing{' '}
						</Link>

						{/* Sign Out */}
						<button
							className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'
							type='button'>
							SignOut
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
		</main>
	)
}

export default ProfilePage
