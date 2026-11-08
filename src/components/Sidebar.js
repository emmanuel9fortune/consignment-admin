import React from 'react'
import { FaMoneyBill } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { MdEventNote, MdHistory, MdTrendingUp } from 'react-icons/md';
import '../styles/sidebar.css'

function SideBar() {
    
    const handleLogOut =async()=>{
        sessionStorage.removeItem('user_id')
        window.location.reload()
    }

  return (
    <div className='sidebar_container'>

        <div className='sidebar_spacer' ></div>
        
        <Link to='/' className='sidebar_links'>
            <p>DASHBOARD</p>
            <MdEventNote size={17} color="#555" />
        </Link>

        <Link to='/view-chats' className='sidebar_links'>
            <p>VIEW CHATS</p>
            <MdTrendingUp size={17} color="#555" /> 
        </Link>

        <Link to='/create-tracker' className='sidebar_links'>
            <p>CREATE NEW TRACKER</p>
            <MdTrendingUp size={17} color="#555" /> 
        </Link>
        
        <div className='sidebar_spacer' ></div>
        

        <div onClick={handleLogOut} className='logout_btn'>
            <FiLogOut size={17} color="#fff" />
            <p>Log-out</p>
        </div>
    </div>
  )
}

export default SideBar