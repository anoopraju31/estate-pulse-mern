import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'

interface CarouselProps {
	images: string[]
	type?: 'form' | 'display'
	setImages?: (imageToRemove: number) => void
}

interface ImagePreviewProps {
	src: string
	visible: boolean
	removeImage: () => void
}

const ImagePreview = ({ src, visible, removeImage }: ImagePreviewProps) => {
	return (
		<div
			className={`group relative w-full h-full rounded-lg shadow-md ${
				visible ? 'block' : 'hidden'
			}`}>
			<div
				onClick={removeImage}
				className='w-10 h-10 rounded-full z-[999] bg-gray-900 dark:bg-white absolute top-4 right-4 cursor-pointer flex justify-center items-center text-white dark:text-gray-900'>
				<IoMdTrash size={23} />
			</div>
			<img
				src={src}
				alt=''
				className='rounded-lg w-full h-full object-contain'
			/>
		</div>
	)
}

const Carousel = ({ images, type, setImages }: CarouselProps) => {
	const [present, setPresent] = useState(0)

	const removeImage = (idxToRemove: number) => {
		if (type === 'form' && setImages) {
			setImages(idxToRemove)
			setPresent(0)
		}
	}
	return (
		<div className='relative w-full'>
			{/* Carousel Wrapper */}
			<div className='relative w-full h-56  overflow-hidden rounded-lg md:h-96'>
				{Array.isArray(images) &&
					images.map((image: string, idx: number) =>
						type === 'form' ? (
							<ImagePreview
								key={idx}
								src={image}
								removeImage={() => removeImage(idx)}
								visible={present === idx}
							/>
						) : (
							<div
								key={idx}
								className={`group relative w-full h-full shadow-md rounded-lg ${
									present === idx ? 'block' : 'hidden'
								}`}>
								<img
									src={image}
									alt=''
									className='w-full h-full object-contain rounded-lg'
								/>
							</div>
						),
					)}
			</div>

			{/* Slider Indicators */}
			<div className='absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
				{Array.isArray(images) &&
					images.map((_, idx) => (
						<button
							key={idx}
							type='button'
							onClick={() => setPresent(idx)}
							className={`w-3 h-3 rounded-full  ${
								present === idx
									? 'bg-gray-900/60 dark:bg-white/60'
									: 'bg-gray-900 dark:bg-white'
							}`}
							aria-current={present === idx ? 'true' : 'false'}
							aria-label={`slide-${idx}`}
						/>
					))}
			</div>

			{/* Slider controls Previous  */}
			<button
				type='button'
				onClick={() =>
					setPresent((prev) =>
						prev === 0 ? images.length - 1 : (prev - 1) % images.length,
					)
				}
				className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
				<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-white group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<MdKeyboardArrowLeft size={23} />
					<span className='sr-only'>Previous</span>
				</span>
			</button>

			{/* Slider controls Next */}
			<button
				type='button'
				onClick={() => setPresent((prev) => (prev + 1) % images.length)}
				className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
				<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-white group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<MdKeyboardArrowRight size={23} />
					<span className='sr-only'>Next</span>
				</span>
			</button>
		</div>
	)
}

export default Carousel
