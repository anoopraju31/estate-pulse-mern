import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { useEffect, useState } from 'react'

interface BreadcrumbItem {
	path: string
	breadcrumbName: string
}

const Breadcrumb = () => {
	const [path, setPath] = useState<BreadcrumbItem[]>([])

	useEffect(() => {
		const getPath = () => {
			const url = window.location.pathname

			const pathArray = url.split('/').filter((part) => part !== '')
			let breadcrumbPath = ''

			setPath(
				pathArray.map((part) => {
					breadcrumbPath += '/' + part
					return {
						path: breadcrumbPath,
						breadcrumbName: part,
					}
				}),
			)
		}
		getPath()
	}, [])

	return (
		<nav className='my-4 flex' aria-label='Breadcrumb'>
			<ol className='inline-flex items-center space-x-1 md:space-x-3'>
				<li className='inline-flex items-center'>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
						<AiFillHome />
						Home
					</Link>
				</li>
				{path?.map((item, idx) => (
					<li key={idx} aria-current='page'>
						{idx < path.length - 1 ? (
							<Link
								to={item.path}
								className='flex items-center text-gray-500 md:ml-2 dark:text-gray-400'>
								<IoIosArrowForward />
								<span className='ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400'>
									{item.breadcrumbName}
								</span>
							</Link>
						) : (
							<div className='flex items-center text-gray-500 md:ml-2 dark:text-gray-400'>
								<IoIosArrowForward />
								<span className='ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400'>
									{item.breadcrumbName}
								</span>
							</div>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumb
