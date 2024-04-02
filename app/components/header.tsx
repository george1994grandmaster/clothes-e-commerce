
import Navigation from './navigation'


export default function Header () {

  const naveItems = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Cart", href: "/cart" },
  ]

  return (
    <>
      <header className="">
        <Navigation navlinks={naveItems}/>
      </header>
    </>
  )
}