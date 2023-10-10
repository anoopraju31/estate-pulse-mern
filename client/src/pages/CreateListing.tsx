import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { BiCloudUpload } from 'react-icons/bi'
import { Carousel, Checkbox, InputField } from '../components'

export interface ListingForm {
	name: string
	description: string
	address: string
	regularPrice: number
	discountPrice: number
	offer: boolean
	bathrooms: number
	bedrooms: number
	furnished: boolean
	parking: boolean
	sale: boolean
	rent: boolean
	images: File[]
	userRef: string
}

const CreateListingPage = () => {
	const [form, setForm] = useState<ListingForm>({
		name: '',
		description: '',
		address: '',
		regularPrice: 0,
		discountPrice: 0,
		bathrooms: 0,
		bedrooms: 0,
		furnished: false,
		parking: false,
		sale: true,
		rent: false,
		offer: false,
		images: [],
		userRef: '',
	})

	useEffect(() => {
		console.log(form)
	}, [form])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.id]:
				e.target.id === 'images'
					? Array.from((e.target as HTMLInputElement).files as FileList)
					: e.target.type === 'checkbox' && e.target instanceof HTMLInputElement
					? e.target.checked
					: e.target.value,
		}))
	}

	const toggleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm((prev) =>
			e.target.id == 'rent'
				? { ...prev, rent: e.target.checked, sale: !e.target.checked }
				: { ...prev, rent: !e.target.checked, sale: e.target.checked },
		)

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				{/* Breadcrumb */}
				<nav className='my-4 flex' aria-label='Breadcrumb'>
					<ol className='inline-flex items-center space-x-1 md:space-x-3'>
						<li className='inline-flex items-center'>
							<Link
								to='/'
								className='inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
								<AiFillHome />
								Home
							</Link>
						</li>
						<li>
							<div className='flex items-center text-gray-500 md:ml-2 dark:text-gray-400'>
								<IoIosArrowForward />
								<Link
									to='/listing'
									className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white'>
									listing
								</Link>
							</div>
						</li>
						<li aria-current='page'>
							<div className='flex items-center text-gray-500 md:ml-2 dark:text-gray-400'>
								<IoIosArrowForward />
								<span className='ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400'>
									create
								</span>
							</div>
						</li>
					</ol>
				</nav>

				{/* Heading */}
				<h1 className='md:mb-8 text-3xl text-center font-semibold'>
					Create Listing
				</h1>

				<form className='w-full max-w-screen-lg md:my-6 mx-auto flex flex-col-reverse md:flex-row md:gap-6'>
					{/* Left Section */}
					<div className='flex-1 flex flex-col gap-4 items-center'>
						{/* Image Preview */}
						{form.images.length > 0 && (
							<Carousel images={form.images} setImages={setForm} />
						)}

						{/* Image Input */}
						<label
							htmlFor='images'
							className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
							<div className='flex flex-col items-center justify-center pt-5 pb-6'>
								<BiCloudUpload size={32} />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload</span> or drag
									and drop
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<input
								id='images'
								name='images'
								onChange={(e) => handleChange(e)}
								multiple
								type='file'
								accept='images/*'
								className='hidden'
							/>
						</label>
					</div>

					{/* Right Section */}
					<div className='flex-1 w-full mx-auto -mt-6'>
						{/* Name */}
						<InputField
							isLabelVisible
							label='Name'
							name='name'
							type='text'
							placeholder='name'
							value={form.name}
							handleChange={(e) => handleChange(e)}
						/>

						{/* description */}
						<InputField
							isLabelVisible
							label='Description'
							name='description'
							placeholder='description'
							isTextArea
							value={form.description}
							handleChange={(e) => handleChange(e)}
						/>

						{/* address */}
						<InputField
							isLabelVisible
							label='Address'
							name='address'
							isTextArea
							placeholder='address'
							value={form.address}
							handleChange={(e) => handleChange(e)}
						/>

						<div className='mt-10 mb-6 flex flex-wrap gap-4 md:gap-6'>
							{/* Sale */}
							<Checkbox
								label='Sale'
								name='sale'
								handleClick={() =>
									setForm((prev) => ({ ...prev, sale: false, rent: true }))
								}
								isChecked={form.sale}
								handleChange={(e) => toggleChange(e)}
							/>

							{/* Rent */}
							<Checkbox
								label='Rent'
								name='rent'
								isChecked={form.rent}
								handleChange={(e) => toggleChange(e)}
							/>

							{/* Parking Spot */}
							<Checkbox
								label='Parking Sport'
								name='parking'
								isChecked={form.parking}
								handleChange={(e) => handleChange(e)}
							/>

							{/* isFurnished */}
							<Checkbox
								label='Furnished'
								name='furnished'
								isChecked={form.furnished}
								handleChange={(e) => handleChange(e)}
							/>

							{/* Offer */}
							<Checkbox
								label='Offer'
								name='offer'
								isChecked={form.offer}
								handleChange={(e) => handleChange(e)}
							/>
						</div>

						<div className='-my-6 flex flex-col md:flex-row md:justify-between md:gap-6'>
							<div className='-mb-3 md:mb-0'>
								{/* Number of bedrooms */}
								<InputField
									placeholder=''
									isLabelVisible
									label='Bedrooms'
									name='bedrooms'
									type='number'
									value={form.bedrooms}
									handleChange={(e) => handleChange(e)}
									step={1}
								/>
							</div>

							<div className='-mt-3 md:mt-0'>
								{/* Number of bathrooms */}
								<InputField
									placeholder=''
									isLabelVisible
									label='Bathrooms'
									name='bathrooms'
									type='number'
									value={form.bathrooms}
									handleChange={(e) => handleChange(e)}
									step={1}
								/>
							</div>
						</div>

						{/* Price */}
						<InputField
							isLabelVisible
							label={form.rent ? 'Regular Price ($ / Month)' : 'Regular Price'}
							name='regularPrice'
							placeholder=''
							type='number'
							value={form.regularPrice}
							handleChange={(e) => handleChange(e)}
							step={1}
						/>

						{/* Discounted Price */}
						{form.offer && (
							<InputField
								isLabelVisible
								label={
									form.rent
										? 'Discounted Price ($ / Month)'
										: 'Discounted Price'
								}
								name='discountPrice'
								placeholder=''
								type='number'
								value={form.discountPrice}
								handleChange={(e) => handleChange(e)}
								step={1}
							/>
						)}
					</div>
				</form>
			</section>
		</main>
	)
}

export default CreateListingPage
