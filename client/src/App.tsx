import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	AboutPage,
	HomePage,
	ProfilePage,
	SignInPage,
	SignUpPage,
} from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
