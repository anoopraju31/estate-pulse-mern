interface SortValue {
	title: string
	value: string
}

export const sortValues: SortValue[] = [
	{
		title: 'Newest',
		value: 'created_at,desc',
	},
	{
		title: 'Oldest',
		value: 'created_at,asc',
	},
	{
		title: 'Price Low to High',
		value: 'regularPrice,asc',
	},
	{
		title: 'Price High to Low',
		value: 'regularPrice,desc',
	},
]
