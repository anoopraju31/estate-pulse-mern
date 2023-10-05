import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch } from 'react-icons/ai'

interface LinkItemProps {
	title: string
	link: string
}

const LinkItem = ({ title, link }: LinkItemProps) => (
	<li>
		<Link
			to={link}
			className='text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75'>
			{title}
		</Link>
	</li>
)

const Header = () => {
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
				<form className='hidden sm:block'>
					<label htmlFor='search' className='sr-only'>
						Search
					</label>
					<div className='px-4 flex items-center bg-slate-50 dark:bg-gray-600 rounded-3xl text-gray-900 dark:text-white '>
						<span className='block py-2'>
							<AiOutlineSearch size={22} />
						</span>
						<input
							type='text'
							name='search'
							id='search'
							className='w-full bg-transparent rounded-lg outline-none py-2 px-4 pe-12 text-sm shadow-sm'
							// className=' focus:outline-none w-24 sm:w-64'
							placeholder='search'
						/>
					</div>
				</form>

				{/* Navigation */}
				<div className='flex items-center justify-end'>
					<nav aria-label='Global' className='hidden md:block'>
						<ul className='flex items-center gap-6 text-sm'>
							<LinkItem title='Home' link='/' />
							<LinkItem title='About' link='/about' />
							<LinkItem title='SignIn' link='/sign-in' />
						</ul>
					</nav>
				</div>

				{/* Menu Toggle Button*/}
				<button className='block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden'>
					<span className='sr-only'>Toggle menu</span>
					<GiHamburgerMenu />
				</button>
			</div>
		</header>
	)
}

export default Header
