import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ComparisonPage from './pages/ComparisonPage'
import Concept1Page from './pages/Concept1Page'
import Concept2Page from './pages/Concept2Page'
import Concept3Page from './pages/Concept3Page'
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ComparisonPage /> },
      { path: 'concept-1', element: <Concept1Page /> },
      { path: 'concept-2', element: <Concept2Page /> },
      { path: 'concept-3', element: <Concept3Page /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
