interface CheckboxProps {
	label: string
	isChecked: boolean
	name: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleClick?: () => void
}

const Checkbox = ({
	label,
	isChecked,
	name,
	handleChange,
	handleClick,
}: CheckboxProps) => {
	return (
		<div
			className='flex items-center gap-2 cursor-pointer'
			onClick={handleClick}>
			<input
				id={name}
				name={name}
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
				className='relative peer shrink-0 appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-sm mt-1 bg-white checked:bg-green-500 checked:border-0'
			/>
			<label
				htmlFor={name}
				className='text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'>
				{label}
				{/* <svg
					className='absolute w-5 h-5 mt-1 hidden z-50 peer-checked:block'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='5'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<polyline points='20 6 9 17 4 12'></polyline>
				</svg> */}
			</label>
		</div>
	)
}

export default Checkbox
