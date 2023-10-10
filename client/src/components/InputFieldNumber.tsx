import React from 'react'

interface InputFieldNumberProps {
	label: string
	value: number
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	style?: string
	step?: number
}

const InputFieldNumber = ({
	label,
	value,
	handleChange,
	step,
}: InputFieldNumberProps) => {
	return (
		<div className='flex items-center gap-4'>
			<input
				type='number'
				id='bedrooms'
				name='bedrooms'
				value={value}
				step={step}
				onChange={handleChange}
				className='w-28 p-3 bg-transparent border border-gray-300 dark:border-gray-500  focus:border-green-500 rounded-lg text-gray-900 dark:text-white text-base shadow-sm outline-none'
			/>

			<label
				htmlFor='bedrooms'
				className='text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'>
				{label}
			</label>
		</div>
	)
}

export default InputFieldNumber
