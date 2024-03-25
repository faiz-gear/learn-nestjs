import { memo } from 'react'
import type { PropsWithChildren, FC } from 'react'

interface IUpdatePasswordProps {}

const UpdatePassword: FC<PropsWithChildren<IUpdatePasswordProps>> = () => {
  return <div>UpdatePassword</div>
}

export default memo(UpdatePassword)
