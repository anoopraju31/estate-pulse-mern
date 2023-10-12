import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
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
import { Breadcrumb, ListingCard } from '../components'

interface ModelProps {
	cancel: () => void
	proceed: () => void
	type: 'DELETE_ACCOUNT' | 'DELETE_LISTING'
}

export interface Listing {
	_id: string
	name: string
	description: string
	address: string
	regularPrice: number
	discountPrice: number
	bathrooms: number
	bedrooms: number
	furnished: boolean
	parking: boolean
	type: 'rent' | 'sale'
	offer: boolean
	imageUrls: string[]
	userRef: string
	createdAt: string
	updatedAt: string
}

interface UserListings {
	success: boolean
	listings?: Listing[]
}

interface Model {
	isOpen: boolean
	type: 'DELETE_ACCOUNT' | 'DELETE_LISTING' | null
	listingId?: string
}

const Model = ({ cancel, proceed, type }: ModelProps) => (
	<div className=' fixed top-0 left-0 right-0 h-screen z-50 flex justify-center items-center backdrop-blur-md bg-gray-900/10 dark:bg-gray-100/10'>
		<div className='p-10 max-w-lg bg-gray-100 dark:bg-gray-900 rounded-xl'>
			<h1 className='text-red-500 font-bold text-center text-xl'>
				Are you sure? <br className='md:hidden' /> you want to delete your
				{type === 'DELETE_ACCOUNT' ? ' account' : ' listing'}?
			</h1>

			<div className='mt-10 flex justify-end gap-4'>
				{/* Delete account */}
				<button
					onClick={proceed}
					tabIndex={0}
					className='w-full sm:w-fit py-2 px-4 bg-red-600 text-white rounded-lg font-medium'
					type='button'>
					Delete
				</button>

				{/* Cancel */}
				<button
					onClick={cancel}
					tabIndex={0}
					className='w-full sm:w-fit py-2 px-4 bg-gray-600 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium'
					type='button'>
					Cancel
				</button>
			</div>
		</div>
	</div>
)

const ProfilePage = () => {
	const [model, setModel] = useState<Model>({
		isOpen: false,
		type: null,
		listingId: '',
	})
	const { currentUser, loading } = useAppSelector((state) => state.user)
	const [listings, setListings] = useState<Listing[]>([])
	const auth = getAuth()
	const dispatch = useAppDispatch()

	useEffect(() => {
		document.body.style.overflow = model.isOpen ? 'hidden' : 'visible'
	}, [model])

	// Fetch user listings
	useEffect(() => {
		const getListings = async () => {
			const res = await fetch(`/api/user/listings/${currentUser?.id}`)
			const data: UserListings = await res.json()

			if (data.success && data.listings) {
				setListings(data?.listings)
			}
		}

		getListings()
	}, [currentUser])

	// Function to handle user sign out
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

	// Function to delete a user account
	const handleDeleteAccount = async () => {
		try {
			dispatch(deleteUserStart())
			setModel({
				isOpen: false,
				type: null,
				listingId: '',
			})

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

	// Function to delete a user listing
	const handleDeleteListing = async (listingId: string) => {
		try {
			const res = await fetch(`/api/listing/delete/${listingId}`, {
				method: 'DELETE',
			})
			setModel({
				isOpen: false,
				type: null,
				listingId: '',
			})

			const data = await res.json()

			if (data?.success) {
				toast.success('Listing Deleted!')
				setListings((prev) =>
					prev.filter((listing) => listing._id !== listingId),
				)
			}
		} catch (error) {
			console.log(error)
			toast.error((error as Error)?.message)
		}
	}

	// Function to handle model proceed
	const handleModel = () => {
		if (model.type === 'DELETE_ACCOUNT') {
			handleDeleteAccount()
		} else if (model.type === 'DELETE_LISTING' && model.listingId) {
			handleDeleteListing(model.listingId)
		}
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				{/* Breadcrumb */}

				<Breadcrumb />

				{/* profile section */}
				<section className=''>
					{/* Heading */}
					<h1 className='mb-4 md:mb-8 text-3xl text-center font-semibold'>
						Profile
					</h1>

					<div className='flex flex-col items-center gap-6 md:gap-8'>
						{/* Profile */}
						<div className='rounded-full border-2 border-gray-600 dark:border-gray-200 '>
							<img
								src={currentUser?.avatar}
								alt={`${currentUser?.username} profile`}
								className='w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 rounded-full aspect-square object-fill'
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
								to='/listing/create'
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
								onClick={() =>
									setModel({
										isOpen: true,
										type: 'DELETE_ACCOUNT',
									})
								}
								className='w-full sm:w-fit py-2 px-4 bg-red-600 text-white rounded-lg font-medium'
								type='button'>
								{loading ? 'Deleting...' : 'Delete'}
							</button>
						</div>
					</div>

					{model.isOpen && model.type && (
						<Model
							proceed={handleModel}
							cancel={() =>
								setModel({
									isOpen: false,
									type: null,
								})
							}
							type={model.type}
						/>
					)}
				</section>
				{listings.length > 0 && (
					<section className='my-6'>
						<h2 className='my-12 text-center text-2xl font-semibold'>
							{' '}
							Listings{' '}
						</h2>

						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
							{listings.map((listing) => (
								<ListingCard
									key={listing._id}
									listing={listing}
									handleDelete={(id: string) =>
										setModel({
											isOpen: true,
											type: 'DELETE_LISTING',
											listingId: id,
										})
									}
								/>
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	)
}

export default ProfilePage
