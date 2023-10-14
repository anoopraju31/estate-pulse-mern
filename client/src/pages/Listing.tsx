import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Listing } from './Profile'

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
		<main className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 px-4 flex flex-col'>
				{listing?.name}
			</div>
		</main>
	)
}

export default ListingPage
