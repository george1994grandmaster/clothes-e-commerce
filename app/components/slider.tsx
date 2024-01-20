'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Sliderİtems, SliderProps } from '../types';
import ProductListArrowLeft  from './svg/productsArrowLeft';
import ProductListArrowRight  from './svg/productsArrowRight';
import Link from 'next/link'

SwiperCore.use([Navigation]);

export default function Slider({ sliderParams }: Sliderİtems){
 
  const swiperRef = useRef<SwiperCore | null>(null);
  
  return (
    <div className="">
      <Swiper 
        className="" style={{ padding: "70px 0"}}
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
       {sliderParams && sliderParams.map((sliderParam) => (
        <SwiperSlide className="px-4" style={{ height: "350px"}} key={sliderParam.id}>
          <div className="w-full h-full shadow-shadow hover:shadow-hoverShadow transition duration-150 ease-out">
            <Link href="" className="flex flex-col  justify-center items-center h-full p-3 h-full w-full">
              <div className="mb-6">
                <img src={sliderParam.src} className="block object-contain" alt="productSrc" style={{ height: "180px", maxHeight: ""}}/>
              </div>
              <div className="">
                <p className="text-lg font-medium text-lightGrey mb-2"> {sliderParam.title}</p>
                <p className="text-lg font-medium text-lightGrey"> {sliderParam.price}</p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
        ))}
        <div className="swiper-button-prev" style={{left: "auto", right: "60px", top: "25px"}}>
          <ProductListArrowLeft/>
        </div>
        <div className="swiper-button-next" style={{left: "auto", right: "0", top: "25px"}}>
          <ProductListArrowRight/>
        </div>
      </Swiper>
    </div>
  )
}


