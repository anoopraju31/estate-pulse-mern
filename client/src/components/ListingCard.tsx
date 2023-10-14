import { Link, useNavigate } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { Listing } from '../pages/Profile'
import { useAppSelector } from '../app/hooks'

interface ListingCardProps {
	listing: Listing
	handleDelete?: (id: string) => void
}

const ListingCard = ({ listing, handleDelete }: ListingCardProps) => {
	const { currentUser } = useAppSelector((state) => state.user)
	const url = window.location.pathname
	const navigate = useNavigate()

	const deleteListing = () => {
		if (handleDelete) {
			handleDelete(listing._id)
		}
	}

	const handleEdit = () => {
		navigate(`/listing/edit/${listing._id}`)
	}

	return (
		<article className='group relative w-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300  border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-shadow overflow-hidden rounded-lg flex flex-col justify-between'>
			<Link to={`/listing/${listing._id}`}>
				<div className='flex flex-col'>
					{/* Listing -type */}
					<p
						className={`${
							listing?.type === 'sale'
								? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
								: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
						} w-fit z-50 mb-1 text-xs font-medium px-2.5 py-0.5 rounded-full absolute top-2 left-2`}>
						{' '}
						{listing?.type === 'sale' ? 'Sale' : 'Rent'}{' '}
					</p>

					{/* Image */}
					<figure className=''>
						<img
							src={
								listing.imageUrls
									? listing.imageUrls[0]
									: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
							}
							alt={listing.name}
							className='w-full aspect-video overflow-hidden object-cover group-hover:scale-105 transition-scale duration-300'
						/>
					</figure>

					<div className='w-full p-3 flex flex-col gap-2'>
						{/* Name */}
						<h3 className='truncate text-lg font-semibold text-slate-700 dark:text-slate-400'>
							{listing.name}
						</h3>

						{/* Location */}
						<address className='flex items-center gap-1'>
							<MdLocationOn className='h-4 w-4 text-green-500' />
							<p className='text-sm truncate w-full'>{listing.address}</p>
						</address>

						{/* description */}
						<p className='text-sm line-clamp-2'>{listing.description}</p>

						{/* Price */}
						<p className='text-slate-500 dark:text-slate-200 mt-2 font-semibold '>
							₹{' '}
							{listing.offer
								? listing.discountPrice.toLocaleString('en-US')
								: listing.regularPrice.toLocaleString('en-US')}
							{listing.type === 'rent' && ' / month'}
						</p>

						<div className='text-slate-700 dark:text-gray-400 flex gap-4'>
							{/* Bedrooms */}
							<p className='font-bold text-xs'>
								{listing.bedrooms > 1
									? `${listing.bedrooms} beds `
									: `${listing.bedrooms} bed `}
							</p>

							{/* Bathrooms */}
							<p className='font-bold text-xs'>
								{listing.bathrooms > 1
									? `${listing.bathrooms} baths `
									: `${listing.bathrooms} bath `}
							</p>
						</div>
					</div>
				</div>
			</Link>

			{currentUser?.id === listing.userRef && url === '/profile' && (
				<div className='p-3 pt-0 flex gap-3 justify-end'>
					{/* Edit Button */}
					<button
						type='button'
						onClick={handleEdit}
						className='py-1 px-4 bg-green-500 disabled:bg-green-500/60 rounded text-center uppercase text-white font-medium'>
						Edit
					</button>

					{/* Delete Button */}
					<button
						type='button'
						onClick={deleteListing}
						className='py-1 px-4 bg-red-500 disabled:bg-green-500/60 rounded text-center uppercase text-white font-medium'>
						Delete
					</button>
				</div>
			)}
		</article>
	)
}

export default ListingCard
