import React from 'react'
import logo from '../assets/logo.png'
import menu from '../assets/menu.png'
const Navbar = () => {
  return (
   <header>
    <nav className='flex justify-betwee h-[80px]'>
        <div className="left w-[60%] flex items-center justify-center gap-5">
           <div className=" logo flex gap-1 items-center">
            <img src={logo} alt="Logo" width={30}/>
            <span>AwaisEsate</span>
           </div>
           <div className="links sm:flex hidden gap-4">
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Contact</a>
            <a href="">Agents</a>
           </div>
        </div>
        <div className="right  w-[40%] flex justify-end items-center gap-5 mr-4">
            <a href="" className='p-2 sm:flex hidden'>Sign In</a>
            <a href="" className='bg-yellow-400 p-2 sm:flex hidden'>Sign up</a>
            <div>
                <img src={menu}
                width={30} alt="Menu-Icon" />
            </div>
        </div>
    </nav>
   </header>
  )
}

export default Navbar
