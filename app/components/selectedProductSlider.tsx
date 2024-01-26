'use client';

import { useRef, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSliderProducts, getProductsSliderItems  } from '../redux/productsSliderSlice'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SliderItems, variations } from '../types';
import ProductListArrowLeft  from './svg/productsArrowLeft';
import ProductListArrowRight  from './svg/productsArrowRight';
import Link from 'next/link'
import Image from 'next/image';

SwiperCore.use([Navigation]);

export default function ShopProductSlider({ sliderParams }: SliderItems){
  const swiperRef = useRef<SwiperCore | null>(null);
  
  return (
    
      <Swiper 
        className=""
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
            slidesPerView: 1,
          },
        
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
       {(sliderParams && sliderParams as variations[]).map((sliderParam, idx) => (
        
        <SwiperSlide className="px-4" key={idx}>
          <div className=" shop-item">
            <Image
              src={sliderParam.src}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    
  )
}