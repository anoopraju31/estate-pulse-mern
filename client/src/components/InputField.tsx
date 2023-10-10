interface InputFieldProps {
	isLabelVisible?: boolean
	isTextArea?: boolean
	label: string
	name: string
	type?: string
	placeholder: string
	step?: number
	value: string | number
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void
}

const InputField = ({
	isLabelVisible,
	isTextArea,
	label,
	name,
	type,
	placeholder,
	value,
	step,
	handleChange,
}: InputFieldProps) => {
	return (
		<div
			className={
				isLabelVisible ? 'my-6 flex flex-wrap items-center gap-4' : 'my-6'
			}>
			<label
				htmlFor={name}
				className={
					isLabelVisible
						? 'text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'
						: 'sr-only'
				}>
				{label}
			</label>

			{isTextArea ? (
				<textarea
					id={name}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className='w-full p-3 bg-transparent border border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
					cols={20}
					rows={10}></textarea>
			) : (
				<input
					type={type}
					id={name}
					name={name}
					step={step}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className='w-full p-3 bg-transparent border border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
				/>
			)}
		</div>
	)
}

export default InputField
