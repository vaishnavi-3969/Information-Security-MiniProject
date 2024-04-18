import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import PaymentForm from './Payment'
import Actions from './Actions'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} exact/>
          <Route path="/payment" element={<PaymentForm />} exact/>
          <Route path='/actions' element=<Actions/> exact/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App