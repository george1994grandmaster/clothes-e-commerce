"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductItems, } from '../../../redux/productsSlice'; 
import { getSliderProducts, getProductsSliderItems  } from '../../../redux/productsSliderSlice'; 
import { getAllData, getData } from '../../../redux/allDataSlice';
import Slider from '../../../components/productsSlider'
import AnimatedText from "../../../components/animatedText";
import Link from 'next/link'
import Image from 'next/image';
import ProductsMenu from '../../../components/productsMenu'

interface Props {
  params: {
    categoryName: string;
  };
}
export default function ProductCategory ({ params }: Props) {
  const dispatch = useDispatch();
  const productsData = useSelector(getProductItems);
  const bannerImg = useSelector(getAllData);
  const getSliderItems = useSelector(getProductsSliderItems);
  
  
  const products = "products";
  const param = "shop";
  const sliderItems = "products";

  useEffect(() => {
    if(params.categoryName === "all") {
      dispatch(getProducts({ products, productCategory: "" }) as any)
    }else{
      dispatch(getProducts({ products, productCategory:params.categoryName.toLowerCase() }) as any)
    }
     dispatch(getData({ param }) as any)
      .then(() => dispatch(getSliderProducts({ sliderItems }) as any));
  }, [dispatch, param, products, sliderItems]);
  

 return (
  <>
  <div className="container">
    <ProductsMenu/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-10">
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
  <AnimatedText border="yellow" bgColor="dark" textColor="yellow"/>
  <div className="container">
    <div className="py-12">
      <Slider sliderParams={getSliderItems}/>
    </div>
  </div>
</>
  )
}