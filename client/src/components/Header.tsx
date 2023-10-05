import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

interface LinkItemProps {
	title: string
	link: string
}

interface SearchFormProps {
	searchTerm: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LinkItem = ({ title, link }: LinkItemProps) => (
	<li>
		<Link
			to={link}
			className='text-gray-500 transition font-medium hover:text-gray-500/75 dark:text-white dark:hover:text-white/75'>
			{title}
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
		<div className='px-4 flex items-center bg-slate-200 dark:bg-gray-600 rounded-3xl text-gray-900 dark:text-white'>
			<span className='block py-2'>
				<AiOutlineSearch size={22} />
			</span>
			<input
				type='text'
				name='search'
				id='search'
				className='w-full bg-transparent rounded-lg outline-none py-2 px-4 pe-12 text-sm shadow-sm'
				placeholder='search'
				value={searchTerm}
				onChange={handleChange}
			/>
		</div>
	</form>
)

const Header = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [navIsOpen, setNavIsOpen] = useState(false)

	// Function to handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	// Function handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearchTerm('')
	}
	return (
		<header className='bg-white dark:bg-gray-900'>
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
							<LinkItem title='SignIn' link='/sign-in' />
						</ul>
					</nav>
				</div>

				{/* Navigation - Mobile Screen */}
				<div
					className={`px-4 md:hidden absolute top-[60px] right-0 left-0 rounded-xl z-10 shadow-secondary py-4 ${
						!navIsOpen ? '-translate-y-[100vh]' : 'translate-y-0'
					} transition-all duration-500`}>
					<div className='rounded-xl p-4 bg-white dark:bg-gray-900 shadow-xl flex flex-col gap-6'>
						<SearchForm
							searchTerm={searchTerm}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>

						<ul className='flex flex-col gap-4 items-center'>
							<LinkItem title='Home' link='/' />
							<LinkItem title='About' link='/about' />
							<LinkItem title='SignIn' link='/sign-in' />
						</ul>
					</div>
				</div>

				{/* Menu Toggle Button*/}
				<button
					onClick={() => setNavIsOpen((prev) => !prev)}
					className='block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden'>
					<span className='sr-only'>Toggle menu</span>
					{navIsOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
				</button>
			</div>
		</header>
	)
}

export default Header
