import { useState } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { IoMdTrash } from 'react-icons/io'
import { ListingForm } from '../pages/CreateListing'

interface CarouselProps {
	images: File[]
	setImages: React.Dispatch<React.SetStateAction<ListingForm>>
}

interface ImagePreviewProps {
	src: string
	visible: boolean
	removeImage: () => void
}

const ImagePreview = ({ src, visible, removeImage }: ImagePreviewProps) => {
	return (
		<div
			className={`group relative w-full h-full bg-green-700 rounded-lg shadow-md ${
				visible ? 'block' : 'hidden'
			}`}>
			<div
				onClick={removeImage}
				className='w-10 h-10 rounded-full z-[999] bg-gray-900 dark:bg-white absolute top-4 right-4 cursor-pointer flex justify-center items-center text-white dark:text-gray-900'>
				<IoMdTrash size={23} />
			</div>
			<img src={src} alt='' className='rounded-lg w-full h-full object-cover' />
		</div>
	)
}

const Carousel = ({ images, setImages }: CarouselProps) => {
	const [present, setPresent] = useState(0)

	const removeImage = (imageToRemove: File) => {
		setImages((prev) => ({
			...prev,
			images: prev.images.filter((image: File) => image !== imageToRemove),
		}))
		setPresent(0)
	}
	return (
		<div className='relative w-full'>
			{/* Carousel Wrapper */}
			<div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
				{Array.isArray(images) &&
					images.map((image: File, idx: number) => (
						<ImagePreview
							key={idx}
							src={window.URL.createObjectURL(image)}
							removeImage={() => removeImage(image)}
							visible={present === idx}
						/>
					))}
			</div>

			{/* Slider Indicators */}
			<div className='absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
				{Array.isArray(images) &&
					images.map((_, idx) => (
						<button
							className='w-3 h-3 rounded-full'
							aria-current={present === idx ? 'true' : 'false'}
							aria-label={`slide-${idx}`}
						/>
					))}
			</div>

			{/* Slider controls  */}
			<button
				type='button'
				onClick={() => setPresent((prev) => (prev - 1) % images.length)}
				className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
				<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<GrFormPrevious />
					<span className='sr-only'>Previous</span>
				</span>
			</button>
			<button
				type='button'
				onClick={() => setPresent((prev) => (prev + 1) % images.length)}
				className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
				<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<GrFormNext />
					<span className='sr-only'>Next</span>
				</span>
			</button>
		</div>
	)
}

export default Carousel
