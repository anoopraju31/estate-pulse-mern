import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { Listing } from '../pages/Profile'

interface ListingCardProps {
	listing: Listing
}

const ListingCard = ({ listing }: ListingCardProps) => (
	<article className='group w-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300  border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-shadow overflow-hidden rounded-lg'>
		<Link to={`/listing/${listing._id}`}>
			<figure className=''>
				<img
					src={
						listing.imageUrls
							? listing.imageUrls[0]
							: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
					}
					alt={listing.name}
					className='w-full aspect-video object-cover group-hover:scale-105 transition-scale duration-300'
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
					<p className='font-bold text-xs'>
						{listing.bedrooms > 1
							? `${listing.bedrooms} beds `
							: `${listing.bedrooms} bed `}
					</p>
					<p className='font-bold text-xs'>
						{listing.bathrooms > 1
							? `${listing.bathrooms} baths `
							: `${listing.bathrooms} bath `}
					</p>
				</div>
			</div>
		</Link>
	</article>
)

export default ListingCard
