import { memo } from 'react'
import type { PropsWithChildren, FC } from 'react'

interface IAdminProps {}

const Admin: FC<PropsWithChildren<IAdminProps>> = () => {
  return <div>Admin</div>
}

export default memo(Admin)
