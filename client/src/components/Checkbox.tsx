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
				tabIndex={0}
				name={name}
				type='checkbox'
				checked={isChecked}
				aria-checked={isChecked}
				onChange={handleChange}
				className='relative shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-sm mt-1 bg-white checked:bg-green-500 checked:border-0'
			/>
			<label
				htmlFor={name}
				className='text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
