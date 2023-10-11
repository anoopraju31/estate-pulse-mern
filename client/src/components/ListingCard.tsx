import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

interface ListingCardProps {}

const ListingCard = (props: ListingCardProps) => (
	<div className='group w-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300  border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-shadow overflow-hidden rounded-lg'>
		<Link to='/'>
			<div className=''>
				<img
					src='https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
					alt=''
					className='w-full aspect-video object-cover group-hover:scale-105 transition-scale duration-300'
				/>
			</div>

			<div className='w-full p-3 flex flex-col gap-2'>
				{/* Name */}
				<h3 className='truncate text-lg font-semibold text-slate-700 dark:text-slate-400'>
					{' '}
					Amity Vila{' '}
				</h3>

				{/* Location */}
				<div className='flex items-center gap-1'>
					<MdLocationOn className='h-4 w-4 text-green-500' />
					<p className='text-sm truncate w-full'>KP Road, Adoor, Kerala</p>
				</div>

				{/* description */}
				<p className='text-sm line-clamp-2'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
					temporibus sequi labore suscipit, a dicta odio libero vel amet animi
					molestias, blanditiis ad vitae. Laudantium minus eos repudiandae
					impedit nam!
				</p>

				{/* Price */}
				<p className='text-slate-500 dark:text-slate-200 mt-2 font-semibold '>
					₹ 50,000 / month
				</p>

				<div className='text-slate-700 dark:text-gray-400 flex gap-4'>
					<div className='font-bold text-xs'>3 Beds</div>
					<div className='font-bold text-xs'>4 baths</div>
				</div>
			</div>
		</Link>
	</div>
)

export default ListingCard
