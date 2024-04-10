"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './svg/logo';
import { NavlinkProps } from '../types';

export default function Sidebar({ navlinks }: NavlinkProps) {

  const pathName = usePathname();

  return (
    <div className="container">
      <div className="flex items-center flex-col py-8">
        <div className="mb-7 pr-5">
          <Link href={"/"} className="p-1 inline-block"><Logo/></Link>
        </div>
        <ul className="flex ai-center flex-col">
          {navlinks.map((link, idx) => {
            const isActive = pathName === link.href;
            return (
              <>
                <li key={idx} className="mb-7">
                  <Link href={link.href} className={`p-1 text-2xl text-white font-medium hover:text-yellow transition duration-100 ${isActive ? 'text-yellow' : ''}`}>{link.label}</Link>
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}