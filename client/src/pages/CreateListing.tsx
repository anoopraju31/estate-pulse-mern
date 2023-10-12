import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import toast from 'react-hot-toast'
import { BiCloudUpload } from 'react-icons/bi'
import { Breadcrumb, Carousel, Checkbox, InputField } from '../components'
import { useAppSelector } from '../app/hooks'
import { app } from '../firebase'
import { removeDuplicates } from '../utils'

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
	imageUrls: string[]
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
		imageUrls: [],
		userRef: '',
	})
	const [isSaveDisabled, setIsSaveDisabled] = useState(false)
	const [isClearDisabled, setIsClearDisabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { currentUser } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (currentUser) setForm((prev) => ({ ...prev, userRef: currentUser?.id }))
	}, [currentUser])

	// disable save button if not all fields are filled
	useEffect(() => {
		setIsSaveDisabled(
			form.name === '' ||
				form.description === '' ||
				form.address === '' ||
				form.regularPrice <= 0 ||
				(form.offer && form.discountPrice <= 0) ||
				form.bathrooms <= 0 ||
				form.bedrooms <= 0 ||
				form.images.length === 0,
		)

		setIsClearDisabled(
			form.name === '' &&
				form.description === '' &&
				form.address === '' &&
				form.regularPrice <= 0 &&
				(form.offer || form.discountPrice <= 0) &&
				form.bathrooms <= 0 &&
				form.bedrooms <= 0 &&
				form.images.length === 0,
		)
	}, [form])

	const getImageUrls = () => {
		return form.images.map((image) => window.URL.createObjectURL(image))
	}

	const setImages = (imageToRemove: number) => {
		setForm((prev) => ({
			...prev,
			images: prev.images.filter((_, idx) => idx !== imageToRemove),
		}))
	}

	// Handle Form Data Change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.id]:
				e.target.id === 'images'
					? removeDuplicates([
							...prev.images,
							...Array.from((e.target as HTMLInputElement).files as FileList),
					  ])
					: e.target.type === 'checkbox' && e.target instanceof HTMLInputElement
					? e.target.checked
					: e.target.value,
		}))
	}

	// Function to toggle between Rent & Sale
	const toggleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm((prev) =>
			e.target.id == 'rent'
				? { ...prev, rent: e.target.checked, sale: !e.target.checked }
				: { ...prev, rent: !e.target.checked, sale: e.target.checked },
		)

	// Clear Form Function
	const handleClear = () => {
		setForm({
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
			imageUrls: [],
			userRef: '',
		})
	}

	// Uploading images to firebase
	const uploadImages = async (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app)
			const fileName = new Date().getTime() + file.name
			const storageRef = ref(storage, fileName)
			const uploadTask = uploadBytesResumable(storageRef, file)

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log(`Upload is ${progress}% done`)
				},
				(error) => {
					reject(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL)
					})
				},
			)
		})
	}

	// Handle Submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setIsClearDisabled(true)
			setIsSaveDisabled(true)
			setIsLoading(true)

			const promises = []

			for (let i = 0; i < form.images.length; i++) {
				promises.push(uploadImages(form.images[i]))
			}

			Promise.all(promises)
				.then((urls) => {
					try {
						fetch('/api/listing/create', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								name: form.name,
								description: form.description,
								address: form.address,
								regularPrice: Number(form.regularPrice),
								discountPrice: Number(form.discountPrice),
								bathrooms: Number(form.bathrooms),
								bedrooms: Number(form.bedrooms),
								furnished: form.furnished,
								parking: form.parking,
								type: form.sale ? 'sale' : 'rent',
								offer: form.offer,
								imageUrls: urls,
								userRef: form.userRef,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								if (!data.success) {
									toast.error(data?.message)
									return
								} else {
									toast.success('Listing Created')
									navigate('/')
								}
							})
							.catch((error) => {
								console.log(error)

								toast.error((error as Error)?.message)
							})
					} catch (error) {
						console.log(error)

						toast.error((error as Error)?.message)
					}
				})
				.catch((error) => {
					toast.error((error as Error)?.message)
				})
		} catch (error) {
			toast.error((error as Error)?.message)

			setIsLoading(false)
			setIsClearDisabled(false)
			setIsSaveDisabled(false)
		}
	}

	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<section className='max-w-screen-2xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				{/* Breadcrumb */}
				<Breadcrumb />

				{/* Heading */}
				<h1 className='md:mb-8 text-3xl text-center font-semibold capitalize'>
					Create Listing
				</h1>

				<form
					onSubmit={handleSubmit}
					className='w-full max-w-screen-xl md:my-6 mx-auto flex flex-col-reverse md:flex-row md:gap-6 relative'>
					{/* Left Section */}
					<div className='h-fit flex-1 flex flex-col gap-6 items-center sticky left-0 right-0 md:top-6 lg:top-8 '>
						{/* Image Preview */}
						{form.images.length > 0 && (
							<Carousel images={getImageUrls()} setImages={setImages} />
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

						{/* buttons */}
						<div className='w-full flex flex-col sm:flex-row sm:justify-between gap-4'>
							{/* Clear Button */}
							<button
								disabled={isClearDisabled}
								type='reset'
								onClick={handleClear}
								className='w-full py-3 px-6 bg-red-500 disabled:bg-red-500/60 rounded-lg text-center uppercase text-white font-medium'>
								Clear
							</button>

							{/* Cancel Button */}
							<Link
								to='/profile'
								type='button'
								className='w-full py-3 px-6 bg-gray-900 dark:bg-white disabled:bg-green-500/60 rounded-lg text-center uppercase text-white dark:text-gray-900 font-medium'>
								Cancel
							</Link>

							{/* Save Button */}
							<button
								disabled={isSaveDisabled}
								type='submit'
								className='w-full py-3 px-6 bg-green-500 disabled:bg-green-500/60 rounded-lg text-center uppercase text-white font-medium'>
								{isLoading ? 'Saving...' : 'Save'}
							</button>
						</div>
					</div>

					{/* Right Section */}
					<div className='flex-1 w-full mx-auto md:-mt-6'>
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
