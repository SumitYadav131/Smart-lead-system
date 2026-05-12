import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Footer from './components/Footer'
import EmailDashboard from './pages/EmailDashboard'

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/emaildashboard' element={<EmailDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App