import { Link, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../app/hooks'

interface LinkItemProps {
	title?: string
	link: string
	imgUrl?: string
}

interface SearchFormProps {
	searchTerm: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LinkItem = ({ title, link, imgUrl }: LinkItemProps) => (
	<li>
		<Link
			to={link}
			className='text-black transition font-medium hover:text-green-500 dark:text-white dark:hover:text-green-500'>
			{imgUrl ? (
				<img
					src={imgUrl}
					alt='user profile'
					className='w-8 h-8 rounded-full object-cover '
				/>
			) : (
				<span> {title} </span>
			)}
		</Link>
	</li>
)

const SearchForm = ({
	searchTerm,
	handleChange,
	handleSubmit,
}: SearchFormProps) => (
	<form onSubmit={handleSubmit}>
		<label htmlFor='search' className='sr-only'>
			Search
		</label>
		<div className='px-4 flex items-center bg-white md:bg-gray-300 dark:bg-gray-600 md:dark:bg-gray-600 rounded-3xl text-gray-900 dark:text-white'>
			<span className='block py-2'>
				<AiOutlineSearch size={22} />
			</span>
			<input
				type='text'
				name='search'
				id='search'
				className='w-full bg-transparent rounded-lg outline-none py-2 px-4 pe-12 text-sm shadow-sm '
				placeholder='search'
				value={searchTerm}
				onChange={handleChange}
			/>
		</div>
	</form>
)

const Header = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [navIsOpen, setNavIsOpen] = useState<boolean>(false)
	const navRef = useRef<HTMLDivElement | null>(null)
	const location = useLocation()
	const { currentUser } = useAppSelector((state) => state.user)

	// close navbar on route change
	useEffect(() => {
		setNavIsOpen(false)
	}, [location])

	// Handle outside click
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			// Check if the click event is outside the Navbar by comparing the target element.
			if (navRef.current && !navRef.current.contains(e.target as Node))
				setNavIsOpen(false)
		}

		// Add a click event listener to the document to handle clicks outside the Navbar.
		document.addEventListener('click', handleOutsideClick)

		return () => {
			// Clean up the event listener when the component unmounts.
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	// Function to handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	// Function handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearchTerm('')
	}
	return (
		<header ref={navRef} className='py-1 bg-gray-100 dark:bg-gray-900'>
			<div className='mx-auto flex h-16 max-w-screen-2xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8'>
				{/* Logo */}
				<Link to='/'>
					<h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
						<span className='sr-only'> Home </span>
						<span className='text-slate-500 dark:text-slate-100'> Estate </span>
						<span className='text-slate-700 dark:text-slate-300'> Pulse </span>
					</h1>
				</Link>

				{/* Search Bar */}
				<div className='hidden sm:block'>
					<SearchForm
						searchTerm={searchTerm}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</div>

				{/* Navigation - Large Screen */}
				<div className='flex items-center justify-end'>
					<nav aria-label='Global' className='hidden md:block'>
						<ul className='flex items-center gap-6 text-sm'>
							<LinkItem title='Home' link='/' />
							<LinkItem title='About' link='/about' />
							{currentUser !== null ? (
								<LinkItem imgUrl={currentUser.avatar} link='/profile' />
							) : (
								<LinkItem title='SignIn' link='/sign-in' />
							)}
						</ul>
					</nav>
				</div>

				{/* Navigation - Mobile Screen */}
				<div
					className={`px-4 md:hidden absolute top-[60px] right-0 left-0 rounded-xl z-10 py-4 ${
						!navIsOpen ? '-translate-y-[100vh]' : 'translate-y-0'
					} transition-all duration-500 `}>
					<div className='rounded-xl p-4 bg-gray-900/10 dark:bg-white/10 shadow-xl flex flex-col gap-6 backdrop-blur-xl'>
						<div className='sm:hidden'>
							<SearchForm
								searchTerm={searchTerm}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
							/>
						</div>

						<ul className='flex flex-col gap-4 items-center'>
							<LinkItem title='Home' link='/' />
							<LinkItem title='About' link='/about' />
							{currentUser !== null ? (
								<LinkItem title='Profile' link='/profile' />
							) : (
								<LinkItem title='SignIn' link='/sign-in' />
							)}
						</ul>
					</div>
				</div>

				{/* Menu Toggle Button*/}
				<button className='relative block rounded bg-gray-200 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden'>
					<span className='sr-only'>Toggle menu</span>
					{navIsOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
					<div
						className='absolute top-0 left-0 right-0 w-full h-full'
						onClick={() => setNavIsOpen((prev) => !prev)}></div>
				</button>
			</div>
		</header>
	)
}

export default Header
