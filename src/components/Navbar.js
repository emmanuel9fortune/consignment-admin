import React from 'react'
import { MdOutlineMenu, MdOutlinePerson, MdOutlineSearch, MdOutlineShoppingBag } from "react-icons/md";
import '../styles/nav-bar.css'

function Navbar() {
  return (
    <div className='NavBarContainer'>
      {/* ====================== */}
      {/* ====INITIAL NAVBAR==== */}
      {/* ====================== */}
      <nav className='InitialNavbar'>
        <div className='InitialNabarSpacer'></div>

        <div className='InitialNabarIcons' >
          <MdOutlineShoppingBag size={25} className='InitialNabarIcon'/>
          <MdOutlinePerson size={25} className='InitialNabarIcon'/>
          <MdOutlineSearch size={25} className='InitialNabarIcon'/>
          <MdOutlineMenu size={25} className='InitialNabarIcon'/>
        </div>
      </nav>

      {/* ====================== */}
      {/* ======MAIN NAVBAR===== */}
      {/* ====================== */}
      <nav className='MainNavbar'>

      </nav>
    </div>
  )
}

export default Navbar