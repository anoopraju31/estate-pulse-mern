interface ListingData {
	name: string
	description: string
	address: string
	regularPrice: number
	discountPrice: number
	bathrooms: number
	bedrooms: number
	furnished: boolean
	parking: boolean
	type: 'rent' | 'sale'
	offer: boolean
	imageUrls: string[]
	userRef: string
}

export const validateListing = (
	data: ListingData,
): {
	isValid: boolean
	error?: string
} => {
	const {
		name,
		description,
		address,
		regularPrice,
		discountPrice,
		bathrooms,
		bedrooms,
		furnished,
		parking,
		type,
		offer,
		imageUrls,
		userRef,
	} = data

	if (
		typeof name !== 'string' ||
		typeof description !== 'string' ||
		typeof address !== 'string' ||
		typeof regularPrice !== 'number' ||
		typeof discountPrice !== 'number' ||
		typeof bathrooms !== 'number' ||
		typeof bedrooms !== 'number' ||
		typeof furnished !== 'boolean' ||
		typeof parking !== 'boolean' ||
		(type !== 'rent' && type !== 'sale') ||
		typeof offer !== 'boolean' ||
		!Array.isArray(imageUrls) ||
		typeof userRef !== 'string'
	) {
		return { isValid: false, error: 'Invalid data types' }
	}

	if (
		regularPrice <= 0 ||
		(offer && discountPrice <= 0) ||
		bathrooms <= 0 ||
		bedrooms <= 0
	) {
		return { isValid: false, error: 'Invalid numeric values' }
	}

	return { isValid: true }
}
