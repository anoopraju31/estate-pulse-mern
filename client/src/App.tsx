import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	AboutPage,
	HomePage,
	ProfilePage,
	SignInPage,
	SignUpPage,
} from './pages'
import { Header } from './components'
import { Toaster } from 'react-hot-toast'

const App = () => {
	return (
		<BrowserRouter>
			{/* Navbar */}
			<Header />

			{/* Routes */}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>

			<Toaster position='top-center' />

			{/* Footer */}
		</BrowserRouter>
	)
}

export default App
