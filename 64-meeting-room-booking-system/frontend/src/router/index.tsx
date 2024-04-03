import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import ErrorPage from '../components/error-page'
import Login from '../pages/login'
import Register from '../pages/register'
import UpdatePassword from '../components/update-password'
import { Layout } from '@/components/layout'
import Dashboard from '@/pages/user/c-pages/dashboard'
import AdminDashboard from '@/pages/admin/c-pages/dashboard'
import { lazy } from 'react'
import ManagementLayout from '@/pages/admin/c-pages/management'
import { useUserStore } from '@/store/user.store'

const MeetingRoomList = lazy(() => import('@/pages/user/c-pages/meeting-room-list'))
const User = lazy(() => import('@/pages/admin/c-pages/management/c-pages/user'))

const userMenu = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: '会议室列表',
    href: '/meeting-room-list'
  }
]
const userRoutes: RouteObject[] = [
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
]
const adminMenus = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: '管理',
    href: '/management'
  }
]
const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminDashboard />
  },
  {
    path: 'management',
    element: (
      <ManagementLayout
        menus={[
          { label: '会议室管理', href: '/management/meeting-room' },
          {
            label: '用户管理',
            href: '/management/user'
          },
          {
            label: '预约管理',
            href: '/management/reservation'
          }
        ]}
      />
    ),
    children: [
      {
        path: 'meeting-room',
        element: <div>会议室管理</div>
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'reservation',
        element: <div>预约管理</div>
      }
    ]
  }
]

const recursiveRenderRoutes = (routes: RouteObject[], parentPath = '') => {
  return routes.map((route, index) => {
    const path = route.path ? parentPath + '/' + route.path : undefined
    return (
      <Route
        key={index}
        path={path}
        element={route.element}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        index={route.index as any}
        children={route.children ? recursiveRenderRoutes(route.children, path) : undefined}
      />
    )
  })
}

const AppRouter = () => {
  const userInfo = useUserStore((state) => state.userInfo)
  const isAdmin = userInfo?.isAdmin || false
  const mainRoutes = userInfo ? (isAdmin ? adminRoutes : userRoutes) : []
  const mainMenus = isAdmin ? adminMenus : userMenu
  return (
    <BrowserRouter>
      <Routes>
        <Route key="/" path="/" element={<Layout menus={mainMenus} />} errorElement={<ErrorPage />}>
          {recursiveRenderRoutes(mainRoutes)}
          {/* {mainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} index={route.index} />
          ))} */}
        </Route>
        <Route key="login" path="login" element={<Login />} />
        <Route key="admin/login" path="admin/login" element={<Login isAdmin />} />
        <Route key="register" path="register" element={<Register />} />
        <Route key="update_password" path="update_password" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
