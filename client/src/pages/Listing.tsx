import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdLocationPin } from 'react-icons/md'
// import { IoMdShareAlt } from 'react-icons/io'
import { FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { Listing } from './Profile'
import { Breadcrumb, Carousel } from '../components'

const ListingPage = () => {
	const [listing, setListing] = useState<Listing | null>(null)
	// const [loading, setLoading] = useState<boolean>(true)
	const params = useParams()

	useEffect(() => {
		const getListing = () => {
			// setLoading(true)

			fetch(`/api/listing/${params.id}`)
				.then((res) => res.json())
				.then((data) => {
					if (!data.success) {
						// setLoading(false)
						return
					}

					setListing(data.listing)
				})
				.catch((error) => {
					console.log(error)
				})
				.finally(() => {
					// setLoading(false)
				})
		}

		getListing()
	}, [params])
	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				<Breadcrumb />
				<div className='py-10 md:py-12 flex flex-col lg:flex-row justify-center items-center gap-8'>
					<div className='flex-1 w-full lg:w-1/2'>
						<Carousel images={listing?.imageUrls as string[]} type='display' />
					</div>
					<div className='flex-1 w-full lg:w-1/2 px-6'>
						<p
							className={`${
								listing?.type === 'sale'
									? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
									: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
							} w-fit mb-1 text-xs font-medium px-2.5 py-0.5 rounded-full`}>
							{' '}
							{listing?.type === 'sale' ? 'Sale' : 'Rent'}{' '}
						</p>
						<h1 className='text-3xl text-center lg:text-left font-medium mb-1'>
							{listing?.name}
						</h1>

						<h2 className='text-sm text-gray-500 tracking-widest mb-4 flex gap-1 justify-center lg:justify-start'>
							<MdLocationPin className='text-green-500 text-lg' />
							<span> {listing?.address} </span>
						</h2>

						<p className='leading-relaxed text-center md:text-left'>
							{listing?.description}
						</p>

						<div className='flex justify-center items-center flex-wrap gap-3 py-5 border-b-2 border-gray-800 mb-5'>
							{listing?.bedrooms && (
								<p className='text-green-500 flex gap-1 items-center'>
									<FaBed className='text-xl' />
									<span>
										{' '}
										{listing?.bedrooms} {listing?.bedrooms > 1 ? 'Beds' : 'Bed'}{' '}
									</span>
								</p>
							)}

							{listing?.bathrooms && (
								<p className='text-green-500 flex gap-1 items-center'>
									<FaBath className='text-lg' />
									<span>
										{' '}
										{listing?.bathrooms}{' '}
										{listing?.bathrooms > 1 ? 'baths' : 'Bath'}{' '}
									</span>
								</p>
							)}

							{listing?.parking && (
								<p className='text-green-500 flex gap-1 items-center'>
									<FaParking className='text-lg' />
									<span>Parking Spot</span>
								</p>
							)}

							{listing?.furnished && (
								<p className='text-green-500 flex gap-1 items-center'>
									<FaChair className='text-lg' />
									<span>Furnished</span>
								</p>
							)}
						</div>
						<div className='flex mb-4 md:mb-0 flex-col sm:flex-row items-center sm:justify-between gap-4'>
							<p className='flex items-center '>
								<span
									className={`font-medium  ${
										listing?.offer ? 'line-through text-base mr-2' : 'text-2xl'
									}`}>
									₹{listing?.regularPrice}
								</span>
								{listing?.offer && (
									<span className='font-medium text-2xl '>
										{' '}
										₹{listing?.discountPrice}
									</span>
								)}
							</p>

							<div className='flex justify-center'>
								<button className='flex ml-auto h-fit bg-green-500 border-0 py-2 px-6 whitespace-nowrap focus:outline-none hover:bg-green-600 rounded'>
									Contact Landlord
								</button>
								{/* <button className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
								<IoMdShareAlt className='text-lg' />
							</button> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ListingPage
