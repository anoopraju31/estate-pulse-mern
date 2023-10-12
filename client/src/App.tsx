import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	AboutPage,
	CreateListingPage,
	EditListingPage,
	EditProfilePage,
	HomePage,
	ProfilePage,
	SignInPage,
	SignUpPage,
} from './pages'
import { Footer, Header, PrivateRoute } from './components'
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
				<Route element={<PrivateRoute />}>
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/profile/edit' element={<EditProfilePage />} />
					<Route path='/listing/create' element={<CreateListingPage />} />
					<Route path='/listing/edit/:id' element={<EditListingPage />} />
				</Route>
			</Routes>

			<Toaster position='top-center' />

			{/* Footer */}
			<Footer />
		</BrowserRouter>
	)
}

export default App
