import { RouteObject, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../components/error-page'
import Login from '../pages/login'
import Register from '../pages/register'
import UpdatePassword from '../components/update-password'
import { Layout } from '@/pages/user/layout'
import Dashboard from '@/pages/user/c-pages/dashboard'
import { lazy } from 'react'

const MeetingRoomList = lazy(() => import('@/pages/user/c-pages/meeting-room-list'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout
        menus={[
          {
            label: '首页',
            href: '/'
          },
          {
            label: '会议室列表',
            href: '/meeting-room-list'
          }
        ]}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'meeting-room-list',
        element: <MeetingRoomList />
      }
    ]
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
