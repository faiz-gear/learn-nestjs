import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type TUserState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInfo: Nullable<Record<string, any>>
}

type TUserActions = {
  setUserInfo: (userInfo: TUserState['userInfo']) => void
}

export const useUserStore = createWithEqualityFn<TUserState & TUserActions>(
  (set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo: userInfo })
  }),
  shallow
)
