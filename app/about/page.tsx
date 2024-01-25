'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getData } from '../redux/allDataSlice'; 
import AnimatedText from "../components/animatedText";
import EmailArrow from "../components/svg/emailArrow";
import Link from 'next/link'
import Image from 'next/image';

export default function About() {
 
  const dispatch = useDispatch();
  const aboutData = useSelector(getAllData);
  
  let param = "about"; 

  useEffect(() => {
    dispatch(getData({param}) as any);
  }, [dispatch, param]);

  
  return (
    <>
      {
        aboutData[0] && 
        <>
          <div className='container'>
            <h1 className="text-4xl text-white font-bold py-4">{aboutData[0].bannerTitle}</h1>
            <div className="py-10 standart-img">
              <Image
                src={aboutData[0].bannerİmg}
                alt="aboutBannerImg"
                layout="responsive"
                width={500} 
                height={440}
              />
            </div>
            <p className="text-lg text-white font-medium py-10">{aboutData[0].bannerText}</p>
          </div>
          <div className="my-10">
          <AnimatedText bgColor="yellow" textColor="dark"/>
          </div>
          <div className="container">
            <div className="py-12">
              <div className="flex items-end flex-wrap">
                <div className="w-full md:w-1/2 mb-12 md:mb-0 standart-img laptop">
                  <Image
                    src={aboutData[0].layoutİmg}
                    alt="shopBanner"
                    layout="responsive"
                    width={500} 
                    height={500}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-lg md:pl-10 font-medium text-lightGrey">{aboutData[0].layoutText}</p>
                </div>
              </div>
            </div>
            <div className="py-12 sm:max-w-2xl">
              <Link href="" className="flex items-center justify-between">
                <strong className="text-yellow text-5xl md:text-7xl font-bold mr-4">GOT EMAIL</strong>
                <EmailArrow/>
              </Link>
              <span className="block h-px bg-lightGrey w-full my-12"></span>
              <p className="text-2xl md:text-3xl text-white font-medium ">Get updates,drops,information and more direct to your inbox. No spam!</p>
            </div>
          </div>
        </>
      }
    </>
  )
}