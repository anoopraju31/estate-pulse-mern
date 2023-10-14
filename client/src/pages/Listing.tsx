import { Breadcrumb } from '../components'

import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { ListingCard } from '../components'
import { Listing } from './Profile'
import { sortValues } from '../constants'
import { useLocation, useSearchParams } from 'react-router-dom'

type Type = 'all' | 'sale' | 'rent'
type Sort = 'created_at' | 'regularPrice'
type Order = 'desc' | 'asc'

interface filterData {
	searchTerm: string
	type: Type
	parking: boolean
	furnished: boolean
	offer: boolean
	sort: Sort
	order: Order
}

const ListingPage = () => {
	const [listings, setListings] = useState<Listing[]>([])
	const [filterData, setFilterData] = useState<filterData>({
		searchTerm: '',
		type: 'all',
		parking: false,
		furnished: false,
		offer: false,
		sort: 'created_at',
		order: 'desc',
	})
	const [isDisabled, setIsDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isFilterOpen, setIsFilerOpen] = useState(false)
	const filterRef = useRef<HTMLButtonElement | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const location = useLocation()

	// Disable clear button
	useEffect(() => {
		setIsDisabled(
			filterData.searchTerm === '' &&
				filterData.type === 'all' &&
				filterData.furnished === false &&
				filterData.offer === false &&
				filterData.parking === false,
		)
	}, [filterData])

	// Fetch Listings
	useEffect(() => {
		// retrieving query values
		const searchTermFromUrl = searchParams.get('searchTerm')
		const typeFromUrl = searchParams.get('type')
		const parkingFromUrl = searchParams.get('parking')
		const furnishedFromUrl = searchParams.get('furnished')
		const offerFromUrl = searchParams.get('offer')
		const sortFromUrl = searchParams.get('sort')
		const orderFromUrl = searchParams.get('order')

		if (
			searchTermFromUrl ||
			typeFromUrl ||
			parkingFromUrl ||
			furnishedFromUrl ||
			offerFromUrl ||
			sortFromUrl ||
			orderFromUrl
		) {
			setFilterData({
				searchTerm: searchTermFromUrl || '',
				type: (typeFromUrl as Type) || 'all',
				parking: parkingFromUrl === 'true' ? true : false,
				furnished: furnishedFromUrl === 'true' ? true : false,
				offer: offerFromUrl === 'true' ? true : false,
				sort: (sortFromUrl as Sort) || 'created_at',
				order: (orderFromUrl as Order) || 'desc',
			})
		}

		const fetchListings = async () => {
			try {
				setIsDisabled(true)
				setLoading(true)

				const searchQuery = location.search
				const res = await fetch(`/api/listing?${searchQuery}`)
				const data = await res.json()

				setListings(data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsDisabled(false)
				setLoading(false)
			}
		}

		fetchListings()
	}, [searchParams, location])

	// Handle outside click
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			// Check if the click event is outside the Navbar by comparing the target element.
			if (filterRef.current && !filterRef.current.contains(e.target as Node))
				setIsFilerOpen(false)
		}

		// Add a click event listener to the document to handle clicks outside the Navbar.
		document.addEventListener('click', handleOutsideClick)

		return () => {
			// Clean up the event listener when the component unmounts.
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	// Handle Filter Input Change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		if (e.target.name === 'sort') {
			// Change sort value
			const value = e.target.value.split(',')
			setFilterData((prev) => ({
				...prev,
				sort: (value[0] as Sort) || 'created_at',
				order: (value[1] as Order) || 'desc',
			}))
			setSearchParams({
				sort: value[0],
				order: value[1],
			})
		} else if (e.target.name === 'type') {
			//Change lising type
			setFilterData((prev) => ({ ...prev, type: e.target.value as Type }))
		} else if (
			e.target.type === 'checkbox' &&
			e.target instanceof HTMLInputElement
		) {
			// Change checkbox values
			setFilterData((prev) => ({
				...prev,
				[e.target.name]: (e.target as HTMLInputElement).checked,
			}))
		} else if (e.target.name === 'search') {
			//Change search term
			setFilterData((prev) => ({ ...prev, searchTerm: e.target.value }))
		}
	}

	// Handle clear filter options
	const handleClear = () => {
		setFilterData((prev) => ({
			...prev,
			searchTerm: '',
			type: 'all',
			parking: false,
			furnished: false,
			offer: false,
		}))

		searchParams.delete('searchTerm')
		searchParams.delete('type')
		searchParams.delete('parking')
		searchParams.delete('furnished')
		searchParams.delete('offer')
		searchParams.delete('sort')
		searchParams.delete('order')
		setSearchParams(searchParams)
	}

	// submit filter options
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setSearchParams({
			searchTerm: filterData.searchTerm,
			type: filterData.type,
			parking: filterData.parking ? 'true' : 'false',
			furnished: filterData.furnished ? 'true' : 'false',
			offer: filterData.offer ? 'true' : 'false',
			sort: filterData.sort,
			order: filterData.order,
		})
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-6 px-4 sm:px-6 lg:px-8 flex flex-col'>
				<Breadcrumb />
				<div className='mt-2 flex gap-6 relative'>
					<div
						className={`w-full max-w-2xl sm:w-96 lg:w-[30%] h-full absolute top-0 left-0 right-0 lg:sticky lg:top-8 z-[100] ${
							isFilterOpen ? 'translate-x-0' : '-translate-x-[100vw]'
						} transition-all duration-500 lg:translate-x-0 `}>
						{/* Filer Search */}
						<aside className='p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
							<h3 className='mb-4 text-xl font-semibold text-center'>
								Filters
							</h3>

							<form onSubmit={handleSubmit}>
								{/* Search by name */}
								<div className='relative' role='search'>
									<label htmlFor='search' className='sr-only'>
										{' '}
										Search for...{' '}
									</label>

									<input
										type='text'
										id='search'
										name='search'
										tabIndex={0}
										placeholder='search'
										value={filterData.searchTerm}
										onChange={handleChange}
										aria-label='Search'
										aria-labelledby='search'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
									/>

									<span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
										<button
											type='button'
											aria-label='Search'
											className='text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'>
											<span className='sr-only'>Search</span>

											<BiSearch />
										</button>
									</span>
								</div>

								{/* Type - Sale/Rent */}
								<div className='text-center mt-4'>
									<label
										htmlFor='type'
										className='block mb-2 text-sm font-medium'>
										Type
									</label>

									<select
										id='type'
										name='type'
										value={filterData.type}
										onChange={handleChange}
										tabIndex={0}
										aria-label='Type'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
										<option value='all'> All </option>
										<option value='sale'> Sale </option>
										<option value='rent'> Rent </option>
									</select>
								</div>

								{/* Amenities */}
								<div className='block py-4 px-2'>
									<fieldset>
										<legend className='block mb-2 text-sm font-medium'>
											{' '}
											Amenities{' '}
										</legend>

										{/* Offer */}
										<div className='flex items-center mb-4'>
											<input
												id='offer'
												name='offer'
												type='checkbox'
												checked={filterData.offer}
												aria-checked={filterData.offer}
												onChange={handleChange}
												tabIndex={0}
												aria-label='Offer'
												aria-describedby='offer-label'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>

											<label
												htmlFor='offer'
												id='offer-label'
												className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
												Offer
											</label>
										</div>

										{/* parking */}
										<div className='flex items-center mb-4'>
											<input
												id='parking'
												name='parking'
												type='checkbox'
												checked={filterData.parking}
												aria-checked={filterData.parking}
												onChange={handleChange}
												tabIndex={0}
												aria-label='Parking Space'
												aria-describedby='parking-label'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>

											<label
												htmlFor='parking'
												id='parking-label'
												className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
												Parking Space
											</label>
										</div>

										{/* Furnished */}
										<div className='flex items-center '>
											<input
												id='furnished'
												name='furnished'
												type='checkbox'
												checked={filterData.furnished}
												aria-checked={filterData.furnished}
												onChange={handleChange}
												tabIndex={0}
												aria-label='Furnished'
												aria-describedby='furnished-label'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>

											<label
												htmlFor='furnished'
												id='furnished-label'
												className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
												Furnished
											</label>
										</div>
									</fieldset>
								</div>

								{/* Clear Button */}
								<button
									type='reset'
									onClick={handleClear}
									disabled={isDisabled}
									tabIndex={0}
									aria-label='Clear Filters'
									className='focus:outline-none disabled:cursor-not-allowed dark:text-white bg-gray-300 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 w-full dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800'>
									Clear Filters
								</button>

								{/* Submit Button */}
								<button
									type='submit'
									disabled={loading}
									tabIndex={0}
									aria-label='Filter Listings'
									className='focus:outline-none disabled:cursor-not-allowed text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 w-full dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
									Filter
								</button>

								{/* Close Filter Button */}
								<button
									type='button'
									onClick={() => setIsFilerOpen(false)}
									tabIndex={0}
									aria-label='Close Filter Menu'
									className='absolute top-3 right-3 lg:hidden text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-lg p-1.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500'>
									<AiOutlineClose />
									<span className=' sr-only'> Close Filter Menu </span>
								</button>
							</form>
						</aside>
					</div>

					<div className='w-full relative'>
						<div className='w-full mb-6 flex gap-6 flex-col md:flex-row justify-between items-center'>
							{/* Heading */}
							<h1 className='text-3xl font-semibold'>Listings</h1>

							{/* Sort */}
							<aside className='w-full md:w-fit flex gap-4 items-center justify-end md:justify-between'>
								{/*Filter Button  */}
								<button
									ref={filterRef}
									type='button'
									onClick={() => setIsFilerOpen((prev) => !prev)}
									aria-label='Toggle Filter'
									className='block lg:hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
									Filter
								</button>

								<div className=''>
									<label htmlFor='sort' className='sr-only'>
										Sort
									</label>

									<select
										id='sort'
										name='sort'
										onChange={handleChange}
										value={`${filterData.sort},${filterData.order}`}
										aria-label='Sort by'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
										{sortValues.map(({ title, value }) => (
											<option key={value} value={value}>
												{' '}
												{title}{' '}
											</option>
										))}
									</select>
								</div>
							</aside>
						</div>

						{listings.length > 0 && (
							<section className='my-6'>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
									{listings.map((listing) => (
										<ListingCard key={listing._id} listing={listing} />
									))}
								</div>
							</section>
						)}
					</div>
				</div>
			</section>
		</main>
	)
}

export default ListingPage
