interface InputFieldProps {
	label: string
	name: string
	type: string
	placeholder: string
	value: string | number
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
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

			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className='w-full p-3 pe-12 bg-transparent border border-gray-500 focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
			/>
		</div>
	)
}

export default InputField
