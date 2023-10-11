import { Link } from 'react-router-dom'
import {
	BiLogoFacebook,
	BiLogoInstagramAlt,
	BiLogoTwitter,
	BiLogoLinkedin,
} from 'react-icons/bi'

const Footer = () => {
	return (
		<footer className='text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-900 body-font'>
			<div className='max-w-screen-2xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex items-center sm:flex-row flex-col'>
				<Link
					to='/'
					className='flex title-font font-medium items-center md:justify-start justify-center '>
					<h3 className='font-bold text-lg sm:text-xl flex flex-wrap'>
						<span className='sr-only'> Home </span>
						<span className='text-slate-500 dark:text-slate-100'> Estate </span>
						<span className='text-slate-700 dark:text-slate-300'> Pulse </span>
					</h3>
				</Link>

				<p className='text-sm text-gray-500 dark:text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 dark:sm:border-gray-800 sm:py-2 sm:mt-0 mt-4'>
					© {new Date().getFullYear()} Estate Pulse —
					<a
						href='https://github.com/anoopraju31'
						className='text-gray-500 ml-1'
						target='_blank'>
						Anoop Raju
					</a>
				</p>
				<span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
					<a
						href='https://www.facebook.com'
						className='text-gray-400 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'>
						<BiLogoFacebook size={23} />
					</a>
					<a
						href='https://www.twitter.com'
						className='ml-3 text-gray-400 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'>
						<BiLogoTwitter size={23} />
					</a>
					<a
						href='https://www.instagram.com'
						className='ml-3 text-gray-400 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'>
						<BiLogoInstagramAlt size={23} />
					</a>
					<a
						href='https://www.linkedin.com'
						className='ml-3 text-gray-400 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'>
						<BiLogoLinkedin size={23} />
					</a>
				</span>
			</div>
		</footer>
	)
}

export default Footer
