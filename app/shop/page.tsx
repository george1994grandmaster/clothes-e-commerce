'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductİtems, } from '../redux/productsSlice'; 
import { getAllData, getData } from '../redux/allDataSlice';
import Slider from '../components/slider'
import AnimatedText from "../components/animatedText";
import Link from 'next/link'


export default function Landing() {

  const dispatch = useDispatch();
  const productsData = useSelector(getProductİtems);
  const bannerImg = useSelector(getAllData);
  const [menuItems] = useState(["Caps", "Hats", "Winterhats"])

  let param = "shop";
  let products = "products";
  let dataCount = 6;
  
  useEffect(() => {
    dispatch(getProducts({products, dataCount}) as any);
    dispatch(getData({param}) as any);
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <ul className="inline-flex items-center mb-4">
          {menuItems.map((item, idx) => (
            <li key={idx} className="group min-w-32 mr-5 border border-lightGrey text-center hover:bg-yellow transition duration-100 ease">
              <Link href="" className="block px-5 py-2 text-lg font-medium tracking-widest group-hover:text-dark transition duration-100 ease">{item}</Link>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-3 gap-8 py-10">
          {productsData && productsData.map((item, idx) => (
            <div className="shadow-shadow hover:shadow-hoverShadow transition duration-150 ease-out">
              <Link href="" className="flex flex-col  justify-center items-center h-full p-3 h-full w-full">
                <div className="mb-6">
                  <img src={item.src} className="block object-contain" alt="productSrc" style={{ height: "180px", maxHeight: ""}}/>
                </div>
                <div className="">
                  <p className="text-lg font-medium text-lightGrey mb-2"> {item.title}</p>
                  <p className="text-lg font-medium text-lightGrey"> {item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {bannerImg[0] && 
        <div className="py-20">
          <img src={bannerImg[0].shopBanner} alt="shopBanner" className="h-auto lg:h-layout"/>
        </div>
        }
      </div>
      <div className="container">
        <AnimatedText border="yellow" bgColor="dark" textColor="yellow"/>
        <div className="py-12">
          <Slider/>
        </div>
      </div>
    </>
  )
}