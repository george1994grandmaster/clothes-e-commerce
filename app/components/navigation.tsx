"use client"

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './svg/logo';
import SidebarIcon from './svg/sidebarIcon';
import Sidebar from './sidebar';
import SidebarClose from "./svg/sidebarCloce";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsQuantity, productsCount } from '../redux/productsSlice'; 
import { NavlinkProps } from "../types";


export default function Navigation({ navlinks }: NavlinkProps) {

  const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
  const pathName = usePathname();
  const dispatch = useDispatch();
  const productsQuantity = useSelector(getProductsQuantity);

  useEffect(() => {
    dispatch(productsCount());
  },[]); 

  const naveItems = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Cart", href: "/cart" },
  ]
  
  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="bg-dark border-b border-lightGrey">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap py-8">
          <div className="pr-5">
            <Link href={"/"} className="p-1 inline-block"><Logo/></Link>
          </div>
          <ul className="sm:flex ai-center justify-end hidden">
            {navlinks.map((link, idx) => {
              const isActive = pathName === link.href;
              return (
                <>
                  <li key={idx} className="mr-7">
                    <Link href={link.href} className={`relative p-1 text-2xl font-medium hover:text-yellow transition duration-100 ${isActive ? 'text-yellow' : 'text-white'}`}>
                      {link.label}
                      {link.label === "Cart" && (
                      <span className="absolute bottom-3/4 right-0 bg-transparent text-yellow font-bold text-lg rounded-full">
                        {productsQuantity}
                      </span>
                    )}
                    </Link>
                  </li>
                </>
              )
            })}
          </ul>
          <button className="sm:hidden block" onClick={() => openSidebar()}>
            <SidebarIcon/>
          </button>
        </div>
      </div>
      <div className={`bg-dark h-screen w-4/6 fixed top-0 flex items-center z-50 ${isSidebarOpen ? "block": "hidden"}`}>
        <button className="absolute top-10 right-9" onClick={() => closeSidebar()}>
          <SidebarClose/>
        </button>
        <Sidebar navlinks={naveItems}/>
      </div>
    </div>
  )
}