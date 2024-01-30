'use client';

import { useRef, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentIndex, changeSlideIndex } from '../redux/productsSliderSlice'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SliderItems, variations } from '../types';
import SelectedProductLeftArrow  from './svg/selectedSliderLeftArrow';
import SelectedProductRightArrow  from './svg/selectedSliderRightArrow';
import Link from 'next/link'
import Image from 'next/image';

SwiperCore.use([Navigation]);

export default function ShopProductSlider({ sliderParams }: SliderItems){
  const dispatch = useDispatch();
  const getSlideIndex = useSelector(getCurrentIndex)
  const swiperRef = useRef<SwiperCore | null>(null);
  
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(getSlideIndex);
    }
  }, [getSlideIndex]);

  const handleSlideChange = (index: number) => {
    if(swiperRef.current) {
      const slideIndex = index;
      dispatch(changeSlideIndex(slideIndex))
    }
  };
  
  return (
    
    <Swiper 
      className=""
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      grabCursor={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={(swiper) => {
        const activeIndex = swiper.activeIndex;
        handleSlideChange(activeIndex);
      }}
    >
      {(sliderParams && sliderParams as variations[]).map((sliderParam, idx) => (
        <SwiperSlide className="px-4" key={idx}>
          <div className="selectedProduct-img mb-6">
            <Image
              src={sliderParam.src}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev" style={{left: "5%", top: "25px", width: "40px"}}>
        <SelectedProductLeftArrow/>
      </div>
      <div className="swiper-button-next" style={{right: "5%", top: "25px", width: "40px"}}>
        <SelectedProductRightArrow/>
      </div>
    </Swiper>
  )
}