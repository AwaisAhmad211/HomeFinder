import React, { useState } from 'react'
import './navbar.scss'
import logo from '../../assets/logo.png'
import hambarger from '../../assets/menu.png'
import { navLinks } from '../../constants'
const Navbar = () => {
    const [menu, setMenu] = useState(false);
  return (
   <header>
      <nav>
        <div className="left">
            <a href='/' className="logo">
                <img src={logo} alt="Logo" width={30} />
                <span>AwaisEstate</span>
            </a>
            <div className='nav__links'>
            {
                navLinks.map((item,index) => (
                    <a href={item.href} key={index}>{item.label}</a>
                ))
            }
            </div>
        </div>
        <div className="right">
            <a href="">Sign In</a>
            <a href="" className='yellow'>Sign up</a>
        </div>

            <img src={hambarger} alt="Menu" width={30} className='hambarger' onClick={()=> setMenu(!menu)}/>
        <div className={menu ? "menu active" : "menu"}>
            <div className='menu__links'>
             {
                 navLinks.map((item,index) => (
                     <a key={index} href={item.href}>{item.label}</a>
                    ))
                }
                <a href="">Sign In</a>
                <a href="">Sign Up</a>
                </div>
        </div>
      </nav>
   </header>
  )
}

export default Navbar
