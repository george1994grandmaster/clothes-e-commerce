'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getData } from './redux/allDataSlice'; 
import { getProducts, getProductİtems } from './redux/productsSlice'; 
import AnimatedText from "./components/animatedText";
import Slider from './components/slider'
import Link from 'next/link'


export default function About() {
 
  const dispatch = useDispatch();
  const landingData = useSelector(getAllData);
  const productsData = useSelector(getProductİtems);

  let param = "landing"; 
  let products = "products";
  
  useEffect(() => {
    dispatch(getData({param}) as any);
    dispatch(getProducts({products}) as any);
  }, [dispatch]);

  return (
    <>
      {
        landingData[0] && 
        <>
          <div className="container">
            <div className="flex items-center flex-wrap-reverse">
              <div className="lg:w-1/2 lg:pr-14 lg:mb-0 mb-12">
                <h3 className="relative text-2xl mb-12 font-medium text-lightGrey">{landingData[0].layoutTitle}
                  <span className="absolute -top-3 left-44 w-16 h-16 border-2 border-yellow rounded-full"></span>
                </h3>
                <p className="text-lg font-medium text-lightGrey">{landingData[0].layoutText}</p>
              </div>
              <div className="lg:w-1/2 mb-12 lg:mb-0 border-l border-l-lightGrey">
                <div className="py-3 pl-6">
                  <img src={landingData[0].layoutİmg} alt="layout-landing" className="h-auto lg:h-layout"/>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <AnimatedText bgColor="yellow" textColor="dark"/>
          </div>
          <div className="container">
            <div className="py-20">
              <div className="flex flex-wrap md:w-9/12 mx-auto">
                {landingData[0].promo && landingData[0].promo.map((item: any, index: number) => (
                  <div className="md:w-1/2 p-3" key={index}>
                    <img src={item.promoİmg} alt="promo-landing" className="h-auto md:h-promo"/>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-2xl text-lightGrey font-medium my-10">{landingData[0].topBannerText}</p>
            <div className="mb-20">
              <img src={landingData[0].topBannerİmg} alt="landingBannerİmg"  className="lg:h-bannerHeight"/>
            </div>
            {
              productsData && <Slider sliderParams={productsData}/>
            }
          </div>
          <div className="">
            <AnimatedText border="yellow" bgColor="dark" textColor="yellow"/>
          </div>
         <div className="container">
          <div className="py-20">
            <img src={landingData[0].bottomBannerİm} alt="landingBannerİmg"  className="lg:h-bannerHeight"/>
          </div>
         </div>
        </>
      }
    </>
  )
}

