import { RouteObject, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../components/error-page'
import Login from '../pages/login'
import Register from '../components/register'
import UpdatePassword from '../components/update-password'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>index</div>,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'update_password',
    element: <UpdatePassword />
  }
]

const router = createBrowserRouter(routes)

export default router
