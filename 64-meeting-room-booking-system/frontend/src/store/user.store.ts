import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type TUserState = {
  userInfo: Nullable<Record<string, string>>
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
