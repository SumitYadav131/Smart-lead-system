import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App