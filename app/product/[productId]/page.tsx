"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, addQuantity, decreaseQuantity, addToBasket, getSelectedProduct } from '../../redux/productsSlice'; 
import ShopProductSlider from '../../components/selectedProductSlider';
import { getCurrentIndex, getSliderProducts, getProductsSliderItems, changeSlideIndex } from '../../redux/productsSliderSlice';
import AnimatedText from '../../components/animatedText';
import Slider from '../../components/productsSlider';
import Image from 'next/image';
import cart from '../../../public/images/cart.png';
import { productsCount } from '../../redux/productsSlice'; 
import SuccessIcon from '../../components/svg/successIcon';
import { ProductDataItem, ProductProps, Variations } from '../../types';


export default function Product({ params }: ProductProps) {
  const dispatch = useDispatch();
  const viewCurrentProduct = useSelector(getSelectedProduct)
  const getSlideIndex = useSelector(getCurrentIndex)
  const getSliderItems = useSelector(getProductsSliderItems)
  const [currentProduct, setCurrentProduct] = useState<ProductDataItem | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  
  const products = "products"; 
  const sliderItems = "products";
  const productCategory = currentProduct?.category;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (params.productId && productCategory !== null) {
      dispatch(getProductById({ products, productId: params.productId }) as any)
        .then(() => {
          dispatch(getSliderProducts({ sliderItems, productCategory }) as any);
        });
    }
  }, [dispatch, products, sliderItems, productCategory, params.productId]);

 
  useEffect(() => {
    if (viewCurrentProduct) {
      const productId = parseInt(params.productId);
      const currentProduct = viewCurrentProduct.find(item => item.id === productId);
      setCurrentProduct(currentProduct as ProductDataItem | null);
    }
  }, [viewCurrentProduct, params.productId]);

  
  
  useEffect(() => {
    if (params.productId && productCategory !== null) {
      dispatch(changeSlideIndex(0));
    }
  }, [dispatch, products, sliderItems, productCategory, params.productId]);


  const handleProductSize = (index: number) => {
    setSelectedSizeIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const addProductHandler = (product: ProductDataItem) => {
    if (product) {
      dispatch(addQuantity(product.id as number));
    }
  };

  const decreaseProductHandler = (product: ProductDataItem) => {
    if (product && product.quantity > 1) {
      dispatch(decreaseQuantity(product.id as number));
    }
  };

  const addToBasketHandler = (product: ProductDataItem) => {
    if (product) {
      dispatch(addToBasket(product as  ProductDataItem));
      dispatch(productsCount());
      const modal = modalRef.current;
      modal?.classList.add('display');

      setTimeout(() => {
        modal?.classList.remove('display');
      }, 3000);
    }
  };

  const changeCurrentImg = (index: number) => {
    dispatch(changeSlideIndex(index));
  };

  return (
    <>
      <div className="container">
        {currentProduct && 
        <div className="flex flex-wrap justify-between py-12">
          <div ref={modalRef} className="modal">
            <span className="flex items-center justify-center mr-2 p-2 bg-success rounded-md">
              <SuccessIcon/>
            </span>
            <span className="text-lg text-success font-bold">
              Product has been added to the cart
            </span>
          </div>
          <div className="w-full md:w-2/5 mb-12 md:mb-0">
            <div className="w-full mb-12">
              <ShopProductSlider sliderParams={currentProduct.variations}/>
            </div>
            <div className="flex items-center hidden sm:block">
              {currentProduct.variations && currentProduct.variations.map((item: Variations, idx: number) => (
                <button key={idx} className={`variation-img w-2/6 p-3 transition duration-150 ease-out ${idx === getSlideIndex ? 'shadow-hoverShadow' : ''}`}
                  onClick={() => changeCurrentImg(idx)}
                >
                  <Image
                    src={item.src}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  />
                </button>
              ))
              } 
            </div>
          </div>
          <div className="w-full md:w-1/2 md:px-4">
            <h2 className="text-4xl text-white font-bold mb-10">{currentProduct.title}</h2>
            <p className="text-lg text-darkGrey font-medium mb-8">{currentProduct.description}</p>
            <p className="text-xl text-white font-medium mb-12">Delivery in 24 hour</p>
            <div className="mb-7">
              <p className="text-xl text-white font-medium mb-4">Matter: Silk</p>
              <div className="inline-flex items-center">
                {currentProduct.productSize &&
                currentProduct.productSize.map((item, idx: number) => (
                  <button
                    key={idx}
                    className={`flex items-center justify-center min-w-9 mr-4 p-1 text-base text-dark font-bold hover:bg-yellow ${
                      idx === selectedSizeIndex ? 'bg-yellow' : 'bg-lightGrey'
                    }`}
                    onClick={() => handleProductSize(idx as number)}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px w-full bg-lightGrey mb-10"></div>
            <div className="flex justify-between sm:items-center flex-col sm:flex-row">
              <p className="text-3xl text-white font-bold mb-4 sm:mb-0">$ {currentProduct.price as string}</p>
              <div className="flex sm:items-center flex-col sm:flex-row">
                <div className="flex items-center mb-4 sm:mb-0">
                  <button className="text-2xl text-white font-medium mr-2" onClick={() => decreaseProductHandler(currentProduct as ProductDataItem)}>&#8722;</button>
                  <p className="text-2xl text-white font-medium mr-2">{currentProduct.quantity as number}</p>
                  <button className="text-2xl text-white font-medium" onClick={() => addProductHandler(currentProduct as ProductDataItem)}>&#x2B;</button>
                </div>
                <button className="bg-yellow flex items-center justify-center sm:ml-6 py-3 px-5 hover:bg-orange transition duration-200" onClick={() => addToBasketHandler(currentProduct as ProductDataItem)}>
                  <span className="mr-3">
                    <Image
                      src={cart}
                      width={15}
                      height={15}
                      alt="cartIcon"
                    />
                  </span>
                  <span className="text-lg text-dark font-medium">BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      <div className="my-10">
        <AnimatedText bgColor="yellow" textColor="dark"/>
      </div>
      <div className="container">
        <div className="py-14">
          <h2 className="text-4xl text-white font-bold px-4">Related Products</h2>
          <Slider sliderParams={getSliderItems}/>
        </div>
      </div>
    </>
  );
}