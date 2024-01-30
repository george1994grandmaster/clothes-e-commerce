'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getData } from './redux/allDataSlice'; 
import { getProducts, getProductItems } from './redux/productsSlice'; 
import { getSliderProducts, getProductsSliderItems  } from './redux/productsSliderSlice'; 
import AnimatedText from "./components/animatedText";
import Slider from './components/productsSlider'
import Link from 'next/link'
import Image from 'next/image';


export default function Landing() {
 
  const dispatch = useDispatch();
  const landingData = useSelector(getAllData);
  const productsData = useSelector(getProductItems);
  const productSliderData = useSelector(getProductsSliderItems);

  let param = "landing"; 
  let products = "products";
  let sliderItems = "products";
  
  useEffect(() => {
    dispatch(getData({ param }) as any)
    .then(() => dispatch(getSliderProducts({ sliderItems }) as any));
  }, [dispatch, param, products, sliderItems]);
  

  return (
    <>
      {
        landingData[0] && 
        <>
          <div className="container">
            <div className="flex items-center flex-wrap-reverse">
              <div className="w-full md:w-1/2 md:pr-14 md:mb-0 mb-12">
                <h3 className="relative text-2xl mb-12 font-medium text-lightGrey">{landingData[0].layoutTitle}
                  <span className="absolute -top-3 left-44 w-16 h-16 border-2 border-yellow rounded-full"></span>
                </h3>
                <p className="text-lg font-medium text-lightGrey">{landingData[0].layoutText}</p>
              </div>
              <div className="w-full md:w-1/2 mb-12 md:mb-0 border-l border-l-lightGrey">
                <div className="py-3 pl-6 standart-img">
                  <Image
                    src={landingData[0].layoutİmg}
                    alt="landingBannerImg"
                    layout="responsive"
                    width={500} 
                    height={440}
                  />
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
                <div className="md:w-1/2 p-3 layout-img" key={index}>
                  <Image
                    src={item.promoİmg}
                    alt="promoLandingImg"
                    layout="responsive"
                    width={500} 
                    height={440}
                  />
                </div>
                ))}
              </div>
            </div>
            <p className="text-2xl text-lightGrey font-medium my-10">{landingData[0].topBannerText}</p>
            <div className="mb-20 standart-img">
              <Image
                src={landingData[0].topBannerİmg}
                alt="landingBannerImg"
                layout="responsive"
                width={500} 
                height={440}
              />
            </div>
            {
              productsData && <Slider sliderParams={productSliderData}/>
            }
          </div>
          <div className="">
            <AnimatedText border="yellow" bgColor="dark" textColor="yellow"/>
          </div>
          <div className="container">
            <div className="py-20 standart-img">
              <Image
                src={landingData[0].bottomBannerİmg}
                alt="landingBannerİmg"
                layout="responsive"
                width={500} 
                height={440}
              />
            </div>
          </div>
        </>
      }
    </>
  )
}

