import { memo } from 'react'
import type { PropsWithChildren, FC } from 'react'

interface IRegisterProps {}

const Register: FC<PropsWithChildren<IRegisterProps>> = () => {
  return <div>Register</div>
}

export default memo(Register)
