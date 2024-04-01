import { RouteObject } from 'react-router-dom'
import ErrorPage from '../components/error-page'
import Login from '../pages/login'
import Register from '../pages/register'
import UpdatePassword from '../components/update-password'
import { Layout } from '@/pages/user/layout'
import Dashboard from '@/pages/user/c-pages/dashboard'
import { lazy } from 'react'
import Admin from '@/pages/admin'

const MeetingRoomList = lazy(() => import('@/pages/user/c-pages/meeting-room-list'))

export const userRoutes: RouteObject = {
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
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: 'meeting-room-list',
      element: <MeetingRoomList />,
      loader: async () => ({
        name: '会议室列表',
        path: '/meeting-room-list'
      })
    }
  ],
  errorElement: <ErrorPage />
}

export const adminRoutes: RouteObject = {
  path: '/',
  element: (
    <Layout
      menus={[
        {
          label: '首页',
          href: '/'
        }
      ]}
    />
  ),
  children: [
    {
      index: true,
      element: <Admin />
    }
  ],
  errorElement: <ErrorPage />
}

const defaultRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout menus={[]} />,
    children: [],
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'admin/login',
    element: <Login isAdmin />
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

export const getDynamicRoutes = (isAdmin: boolean) => {
  const dynamicRoutes = [...defaultRoutes]
  dynamicRoutes[0] = isAdmin ? adminRoutes : userRoutes
  return dynamicRoutes
}

export default defaultRoutes
