'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SliderItems, SliderProps } from '../types';
import ProductListArrowRight  from './svg/productsArrowRight';
import ProductListArrowLeft  from './svg/productsArrowLeft';
import Link from 'next/link'
import Image from 'next/image';

SwiperCore.use([Navigation]);

export default function Slider({ sliderParams }: SliderItems){
  const swiperRef = useRef<SwiperCore | null>(null);
  
  return (
    <Swiper 
      className="" style={{ padding: "67px 0"}}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
        
      breakpoints={{
        500: {
            slidesPerView: 1,
          },
        720: {
            slidesPerView: 2,
          },
        992: {
            slidesPerView: 3,
          },
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      >
      {(sliderParams as SliderProps[]).map((item) => (
        <SwiperSlide className="px-4" style={{ height: "350px"}} key={item.id}>
          <div className="w-full h-full shadow-shadow hover:shadow-hoverShadow transition duration-150 ease-out">
            <Link href={`/product/${item.id}`} className="flex flex-col justify-center items-center h-full p-3 h-full w-full">
              <div className="w-full mb-6 shop-item">
                <Image
                  src={item.src}
                  alt="productSrcImg"
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
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev border border-solid border-yellow products-arrow" style={{left: "auto", right: "60px", top: "25px", borderRadius: "50%", width: "45px"}}>
        <ProductListArrowLeft/>
      </div>
      <div className="swiper-button-next border border-solid border-yellow products-arrow" style={{left: "auto", right: "0", top: "25px", borderRadius: "50%",  width: "45px", transform:"rotate(180deg)"}}>
        <ProductListArrowRight/>
      </div>
    </Swiper>
  )
}


