import Link from 'next/link';
import FooterLogo from './svg/footerLogo'

export default function Footer () {

  const naveItems = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Cart", href: "/cart" },
  ]

  return (
    <footer className="py-12 bg-yellow">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap mb-20">
          <div className="w-full md:w-1/2 md:mb-0 mb-12">
            <div className="mb-7">
              <FooterLogo/>
            </div>
            <p className="text-xl text-dark font-bold mb-8">
              Get the latest news and updates
            </p>
            <form action="">
              <div className="flex sm:items-end sm:flex-row flex-col">
                <label className="sm:mb-0 mb-5 pr-3">
                  <input type="email" placeholder='email' spellCheck="false" className="p-2 text-dark border-b border-dark outline-none bg-transparent placeholder-dark ::placeholder"/>
                </label>
                <div className="pl-3">
                  <button type="button" className="px-9 py-4 border border-dark hover:bg-orange transition duration-200 text-dark text-sm font-medium">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex md:justify-end">
              <div className="flex flex-col">
                <Link href={''} className="mb-2 p-1 text-xl text-dark font-semibold hover:text-orange transition duration-100">FAQ</Link>
                <Link href={''} className="mb-2 p-1 text-xl text-dark font-semibold hover:text-orange transition duration-100">PRIVACY POLICIES</Link>
                <Link href={''} className="p-1 text-xl text-dark font-semibold hover:text-orange transition duration-100">TERMS & CONDITIONS</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-dark mb-10"></div>
        <div className="flex justify-between sm:items-center sm:flex-row flex-col">
          <div className="flex items-center sm:mb-0 mb-3">
            <span className="mr-1 text-xl text-dark font-semibold" >©</span>
            <span className="mr-1 text-lg text-dark font-medium">COPYRIGHT</span>
            <span className="text-lg text-dark font-medium">2024</span>
          </div>
          <div>
            <Link href={''} className="mr-7 p-1 text-lg text-dark font-medium hover:text-orange transition duration-100">INSTAGRAM</Link>
            <Link href={''} className="p-1 text-lg text-dark font-medium hover:text-orange transition duration-100">FACEBOOK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}