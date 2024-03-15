
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ProductsMenu () {
  const pathname = usePathname();

  const menuItems = ["All", "Caps", "Hats", "Winterhats"];

  return (
    <div className="container">
      <ul className="flex justify-start flex-col md:flex-row items-start mb-4">
        {menuItems.map((item, idx) => (
          <li key={idx} className={` min-w-52 md:min-w-40 md:mr-5 md:mb-0 mb-4 border border-lightGrey hover:bg-yellow hover:text-dark text-center ${pathname.includes(`/shop/category/${item.toLowerCase()}`) ? 'bg-yellow text-dark' : ''}`}>
            <Link href={`/shop/category/${item.toLowerCase()}`} className="block w-full px-5 py-2 text-lg font-medium tracking-widest">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}