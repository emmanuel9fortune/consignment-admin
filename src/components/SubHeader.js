import React from 'react'
import { MdChatBubble, MdCreditCard, MdWallet } from 'react-icons/md';
import '../styles/dashboard.css'
import { Link, useNavigate } from 'react-router-dom';

function SubHeader({chat}) { 

    const navigate = useNavigate()

    const menuClick =()=>{
        const menu_icon = document.querySelector(".menu-icon")
        menu_icon.classList.toggle("open");
        const menu_dropdown = document.querySelector(".menu_dropDown")
        menu_dropdown.classList.toggle("dropDown");
    }
    
    const fstclick =()=>{
        navigate('/')
    }

    const secclick =()=>{
        navigate('/view-chats')
    }

    const trdclick =()=>{
        navigate('/create-tracker')
    }

    const handleLogOut =async()=>{
        sessionStorage.removeItem('user_id')
        window.location.reload()
    }

  return (
    <div className='dashboard_body_header' style={{flexWrap:'wrap'}} >
        <div className='dashboard_body_header_displays_icon'>
            <div onClick={menuClick} className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div className='menu_dropDown' style={{zIndex:1000}} >
            <div onClick={()=> fstclick()} className='dropdown_slide'>
                <h3>DASHBOARD</h3>
            </div>

            <div onClick={()=> secclick()} className='dropdown_slide'>
                <h3>VIEW CHATS</h3>
            </div>
                
            <div onClick={()=> trdclick()} className='dropdown_slide'>
                <h3>CREATE NEW TRACKER</h3>
            </div>
                
            <div style={{margin:'40px 0'}} ></div>

            <div onClick={handleLogOut} className='dropdown_slide_sign_btn'>
                <h3>Log out</h3>
            </div>
        </div>

        {
            !chat &&
            <Link to={'/view-chats'} style={{textDecoration:'none', color:'#222'}} className='dashboard_body_header_displays' >
                <div className='dashboard_body_header_displays_icon' >
                    <MdChatBubble size={25} color="#0463ca" />
                </div>
                <div className='dashboard_body_header_displays_text'>
                    <p>View Chats</p>
                </div>
            </Link>
        }
    </div>
  )
}

export default SubHeader