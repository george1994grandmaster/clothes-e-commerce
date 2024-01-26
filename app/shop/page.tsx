'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductItems, } from '../redux/productsSlice'; 
import { getSliderProducts, getProductsSliderItems  } from '../redux/productsSliderSlice'; 
import { getAllData, getData } from '../redux/allDataSlice';
import Slider from '../components/productsSlider'
import AnimatedText from "../components/animatedText";
import Link from 'next/link'
import Image from 'next/image';


export default function Landing() {

  const dispatch = useDispatch();
  const productsData = useSelector(getProductItems);
  const bannerImg = useSelector(getAllData);
  const productSliderDataData = useSelector(getProductsSliderItems);
  const [menuItems] = useState(["Caps", "Hats", "Winterhats"])

  let param = "shop";
  let products = "products";
  let dataCount = 6;
  let sliderItems = "products";
  
  useEffect(() => {
    dispatch(getProducts({products, dataCount}) as any);
    dispatch(getData({param}) as any);
    dispatch(getSliderProducts({sliderItems}) as any);
  }, [dispatch, param, products, dataCount, sliderItems]);

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
          {productsData && productsData.map((item) => (
            <div className="shadow-shadow hover:shadow-hoverShadow transition duration-150 ease-out" key={item.id}>
              <Link href={`/product/${item.id}`} className="flex flex-col justify-center items-center h-full p-3 h-full w-full">
                <div className="w-full mb-6 shop-item">
                  <Image
                    src={item.src} 
                    alt="productImg"
                    layout="responsive"
                    width={500} 
                    height={180}
                  />
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
        <div className="py-20 standart-img">
          <Image
            src={bannerImg[0].shopBanner}
            alt="shopBanner"
            layout="responsive"
            width={500} 
            height={440}
          />
        </div>
        }
      </div>
      <div className="container">
        <AnimatedText border="yellow" bgColor="dark" textColor="yellow"/>
        <div className="py-12">
          <Slider sliderParams={productSliderDataData}/>
        </div>
      </div>
    </>
  )
}