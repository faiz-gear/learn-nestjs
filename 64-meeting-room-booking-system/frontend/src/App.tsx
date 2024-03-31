import { useRoutes } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import defaultRoutes from './router'
import { Suspense } from 'react'
import { useUserStore } from './store/user.store'

function App() {
  const dynamicRoutes = useUserStore((state) => state.routes)
  return (
    <>
      <Suspense fallback={'loading...'}>{useRoutes(dynamicRoutes.length ? dynamicRoutes : defaultRoutes)}</Suspense>
      <Toaster />
    </>
  )
}

export default App
