interface InputFieldProps {
	isTextArea?: boolean
	label: string
	name: string
	type?: string
	placeholder: string
	value: string | number
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void
}

const InputField = ({
	isTextArea,
	label,
	name,
	type,
	placeholder,
	value,
	handleChange,
}: InputFieldProps) => {
	return (
		<div className='my-6'>
			<label htmlFor={name} className='sr-only'>
				{label}
			</label>

			{isTextArea ? (
				<textarea
					id={name}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className='w-full p-3 pe-12 bg-transparent border border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
					cols={20}
					rows={10}></textarea>
			) : (
				<input
					type={type}
					id={name}
					name={name}
					step='1'
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className='w-full p-3 pe-12 bg-transparent border border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
				/>
			)}
		</div>
	)
}

export default InputField
