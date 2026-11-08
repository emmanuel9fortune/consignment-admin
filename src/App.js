import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/main-pages/Home';
import Chats from './routes/main-pages/Chats';
import { ToastContainer } from 'react-toastify';
import Login from './routes/log-in/Login';
import CreateTracker from './routes/main-pages/CreateTracker';
import EditTrackers from './routes/main-pages/EditTrackers';

function App() {

  const admin = localStorage.getItem('admin_id')

  return (
    <div className='App'>
      <ToastContainer style={{zIndex:9999999999999999999}} />

      {
        admin ?
        <HashRouter>
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/view-chats' element={<Chats />} />
            <Route path='/edittracker/:id' element={<EditTrackers />} />
            <Route path='/create-tracker' element={<CreateTracker />} />
          </Routes>
        </HashRouter>
        :
        <Login/>
      }
    </div>
  )
} 

export default App