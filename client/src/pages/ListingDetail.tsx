import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdLocationPin } from 'react-icons/md'
import { IoMdShareAlt } from 'react-icons/io'
import { FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'
import { Listing } from './Profile'
import { Breadcrumb, Carousel } from '../components'
import toast from 'react-hot-toast'

const ListingDetailPage = () => {
	const [listing, setListing] = useState<Listing | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const getListing = () => {
			setLoading(true)

			fetch(`/api/listing/${params.id}`)
				.then((res) => res.json())
				.then((data) => {
					if (!data.success) {
						setLoading(false)
						navigate('/*')
					}

					setListing(data.listing)
				})
				.catch((error) => {
					console.log(error)
				})
				.finally(() => {
					setLoading(false)
				})
		}

		getListing()
	}, [params, navigate])

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href)
		toast.success('copied!')
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			{loading ? (
				<div
					className='w-full min-h-[var(--container-min-height)] flex justify-center items-center'
					aria-label='Loading'>
					{/* Laoding */}
					<p className='flex gap-4 text-3xl font-bold'>
						<span className='h-12 flex justify-center items-center'>
							{' '}
							Loading{' '}
						</span>
						<span className='animate-spin duration-300 ease-in w-12 h-12 flex justify-center items-center'>
							<FiLoader />
						</span>
					</p>
				</div>
			) : (
				<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
					{/* Beadcrumbs */}
					<Breadcrumb />
					<div className='py-10 md:py-12 flex flex-col lg:flex-row justify-center items-center gap-8 relative'>
						{/* Listing Image Carousel */}
						<div className='flex-1 w-full lg:w-1/2'>
							<Carousel
								images={listing?.imageUrls as string[]}
								type='display'
								aria-label='Image Carousel'
							/>
						</div>

						<div className='flex-1 w-full lg:w-1/2 px-6'>
							{/* Listing Type Badge - Sale/Rent */}
							<span
								role='status'
								aria-live='polite'
								className={`${
									listing?.type === 'sale'
										? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
										: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
								} w-fit block mb-1 text-xs font-medium px-2.5 py-0.5 rounded-full absolute top-4 left-4 lg:static`}
								aria-label={`Listing Type: ${
									listing?.type === 'sale' ? 'Sale' : 'Rent'
								}`}>
								{' '}
								{listing?.type === 'sale' ? 'Sale' : 'Rent'}{' '}
							</span>

							{/* Title */}
							<h1
								className='text-3xl text-center lg:text-left font-medium mb-1'
								aria-label={`Listing Title: ${listing?.name}`}>
								{listing?.name}
							</h1>

							{/* Address */}
							<address aria-label='Listing Address'>
								<div className='text-sm text-gray-500 tracking-widest mb-4 flex gap-1 justify-center lg:justify-start'>
									<MdLocationPin className='text-green-500 text-lg' />
									<span> {listing?.address} </span>
								</div>
							</address>

							{/* Description */}
							<p
								className='leading-relaxed text-center md:text-left'
								aria-label='Listing Description'>
								{listing?.description}
							</p>

							{/* Features */}
							<ul
								className='flex justify-center items-center flex-wrap gap-3 py-5 border-b-2 border-gray-800 mb-5'
								aria-label='Listing Features'>
								{/* Number of bedrooms */}
								{listing?.bedrooms && (
									<li
										className='text-green-500 flex gap-1 items-center'
										aria-label={`Bedrooms: ${listing?.bedrooms}`}>
										<FaBed className='text-xl' />
										<span>
											{' '}
											{listing?.bedrooms}{' '}
											{listing?.bedrooms > 1 ? 'Beds' : 'Bed'}{' '}
										</span>
									</li>
								)}

								{/* Number of bathrooms */}
								{listing?.bathrooms && (
									<li
										className='text-green-500 flex gap-1 items-center'
										aria-label={`Bathrooms: ${listing?.bathrooms}`}>
										<FaBath className='text-lg' />
										<span>
											{' '}
											{listing?.bathrooms}{' '}
											{listing?.bathrooms > 1 ? 'baths' : 'Bath'}{' '}
										</span>
									</li>
								)}

								{/* Parking */}
								{listing?.parking && (
									<li
										className='text-green-500 flex gap-1 items-center'
										aria-label='Parking Available'>
										<FaParking className='text-lg' />
										<span>Parking Spot</span>
									</li>
								)}

								{/* Furnished */}
								{listing?.furnished && (
									<li
										className='text-green-500 flex gap-1 items-center'
										aria-label='Furnished'>
										<FaChair className='text-lg' />
										<span>Furnished</span>
									</li>
								)}
							</ul>
							<div className='flex mb-4 md:mb-0 flex-col sm:flex-row items-center sm:justify-between gap-4'>
								{/* Pricing */}
								<p
									className='flex items-center'
									aria-label='Pricing Information'>
									{/* Regular Price */}
									<span
										className={`font-medium  ${
											listing?.offer
												? 'line-through text-base mr-2'
												: 'text-2xl'
										}`}
										aria-label={`Discounted Price: ₹${listing?.regularPrice}`}>
										₹{listing?.regularPrice}
									</span>
									{/* Discounted Price */}
									{listing?.offer && (
										<span
											className='font-medium text-2xl'
											aria-label={`Discounted Price: ₹${listing?.discountPrice}`}>
											{' '}
											₹{listing?.discountPrice}
										</span>
									)}
								</p>

								<div className='flex justify-center'>
									{/* Contact Landlord */}
									<button
										className='flex ml-auto h-fit bg-green-500 border-0 py-2 px-6 whitespace-nowrap focus:outline-none hover:bg-green-600 rounded'
										aria-label='Contact Landlord'>
										Contact Landlord
									</button>
									{/* Share Link */}
									<button
										className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'
										aria-label='Share Listing and Copy Link to Clipboard'
										onClick={copyToClipboard}
										role='button'>
										<IoMdShareAlt className='text-lg' aria-hidden='true' />
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	)
}

export default ListingDetailPage
