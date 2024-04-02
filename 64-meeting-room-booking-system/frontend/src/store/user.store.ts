import { RouteObject } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type TUserState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInfo: Nullable<Record<string, any>>
  routes: RouteObject[]
}

type TUserActions = {
  setUserInfo: (userInfo: TUserState['userInfo']) => void
  setRoutes: (routes: TUserState['routes']) => void
}

export const useUserStore = createWithEqualityFn<TUserState & TUserActions>(
  (set) => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') ?? '{}') ?? null,
    routes: [],
    setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    setRoutes: (routes) => set({ routes: routes })
  }),
  shallow
)
