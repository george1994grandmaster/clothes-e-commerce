'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getData } from '../redux/allDataSlice'; 
import AnimatedText from "../components/animatedText";
import EmailArrow from "../components/svg/emailArrow";
import Link from 'next/link'

export default function About() {
 
  const dispatch = useDispatch();
  const aboutData = useSelector(getAllData);
  
  let param = "about"; 

  useEffect(() => {
    dispatch(getData({param}) as any);
  }, [dispatch]);

  
  return (
    <>
      {
        aboutData[0] && 
        <>
          <div className='container'>
            <h1 className="text-4xl text-white font-bold py-4">{aboutData[0].bannerTitle}</h1>
            <div className="py-10">
              <img src={aboutData[0].bannerİmg} alt="aboutBannerİmg" className="lg:h-bannerHeight"/>
            </div>
            <p className="text-lg text-white font-medium py-10">{aboutData[0].bannerText}</p>
          </div>
          <div className="my-10">
            <AnimatedText textColor="dark"/>
          </div>
          <div className="container">
            <div className="py-12">
              <div className="flex items-end flex-wrap">
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <img src={aboutData[0].layoutİmg} alt="layout-info" className="h-auto lg:h-layout"/>
                </div>
                <div className="lg:w-1/2">
                  <p className="lg:pl-14 text-lg font-medium text-lightGrey">{aboutData[0].layoutText}</p>
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