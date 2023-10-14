import { Breadcrumb } from '../components'

const ListingPage = () => {
	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				<Breadcrumb />
			</section>
		</main>
	)
}

export default ListingPage
