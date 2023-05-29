import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './../../Images/logo.png'

export default function Header({ isLog, updateIsLog }) {

   const [nav, setNav] = useState(false);
   const [isToken, setToken] = useState(false);

   function handleLogOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      updateIsLog(false)
   }

   useEffect( () => {
      setToken(JSON.parse(localStorage.getItem('token')) || false);
   }, [isLog])

   return (

      <header aria-label="Site Header" class="bg-white">
         <div
            class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
         >
            <Link to="/" className='block text-blue-600'>
               <a class="block text-blue-600" href="/">
                  <span class="sr-only">ToDo</span>

                  <div class="flex-shrink-0 justify-center">
                     <img class=" w-40	" src={Logo} alt="Workflow logo" />
                  </div>

               </a>
            </Link>
            <div class="flex flex-1 items-center justify-end">

               <button onClick={() => setNav(!nav)} class="block ml-4 rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-blue-600 md:hidden">
                  <span class="sr-only">Toggle menu</span>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     class="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     stroke-width="2">
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               </button>

               <nav className={`md:hidden fixed top-[0px] rounded-md  w-60 border-blue-600	border-2	 bg-gray-100 z-40 duration-700 ${nav ? "right-[53px] top-[53px]" : "right-[-100vw]"
                  } `}>
                  <ul class="flex flex-col items-center">
                     <li className='mt-5'>
                        <Link to="/" className='text-gray-500 font-bold transition hover:text-blue-600'>Home</Link>
                     </li>
                     <li className='mt-12'>
                        <Link to="/aboutUs" className='text-gray-500 font-bold transition hover:text-blue-600'>About Us</Link>
                     </li>
                     <li className='mt-12'>
                        <Link to="/contactUs" className='text-gray-500 font-bold transition  hover:text-blue-600'>Contact Us</Link>
                     </li>
                  </ul>
               </nav>

               <nav aria-label="Site Nav" class="hidden md:block">
                  <ul class="flex items-center gap-6 text-sm ">
                     <li>
                        <Link to="/" className='text-gray-500 font-bold transition hover:text-blue-600'>ToDo</Link>
                     </li>
                     <li>
                        <Link to="/aboutUs" className='text-gray-500 font-bold transition hover:text-blue-600'>About Us</Link>
                     </li>
                     <li>
                        <Link to="/contactUs" className='text-gray-500 font-bold transition  hover:text-blue-600'>Contact Us</Link>
                     </li>
                  </ul>
               </nav>
            </div>
            <div class="flex items-center gap-4">


               <div class="sm:flex sm:gap-4">
                  {
                     isToken || isLog ?
                        <Link onClick={handleLogOut} to="/signIn" className='block rounded-md bg-blue-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700'>Log Out</Link>
                        :
                        <Link to="/signIn" className='block rounded-md bg-blue-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700'>Log In</Link>
                  }
               </div>


            </div>
         </div>
      </header>
   )
}
