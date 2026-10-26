import { Outlet } from 'react-router-dom'
import { ScrollToTop } from './components/shared/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}
