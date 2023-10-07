import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const PrivateRoute = () => {
	const { currentUser } = useAppSelector((state) => state.user)
	return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
