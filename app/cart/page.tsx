"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addProduct, decreaseProduct, addToBasket} from '../redux/productsSlice'; 
import AnimatedText from '../components/animatedText';
import Image from 'next/image'
import { current } from '@reduxjs/toolkit';

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
}

export default function GetCategorieResult() {
  const dispatch = useDispatch();
  const [cartFromLocalStorage, setCartFromLocalStorage] = useState<DataItem[]>([]);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
    setCartFromLocalStorage(cartFromLocalStorage);
    //localStorage.removeItem('cart')
  }, []);

  const addProductCount = (product: DataItem) => {
    if (product.quantity) {
      dispatch(addProduct(product as DataItem));
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      setCartFromLocalStorage(cartFromLocalStorage);
      console.log(47443)
    }
  }
  
  const decreaseProductCount = (product: DataItem) => {
    if (product.quantity && product.quantity > 1) {
      dispatch(decreaseProduct(product as DataItem));
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      setCartFromLocalStorage(cartFromLocalStorage);
    }
  }
  
  return (
    <>
      <AnimatedText bgColor="yellow" textColor="dark"/>
      <div className="container">
        <div className="w-10/12 mx-auto">
          <h3 className="text-3xl text-white font-bold text-center mb-10">YOUR CART</h3>
          {
            cartFromLocalStorage && 
            <>
              <p className="text-2xl text-white font-medium mb-8">items summary({cartFromLocalStorage.length})</p>
              <div className="flex">
                <div className="w-full md:w-2/3">
                  <div className="hidden md:flex flex-col gap-y-20">
                    {cartFromLocalStorage.map((item: DataItem) => (
                      <div key={item.id} className="flex items-center gap-x-20">
                        <div className="cart-img">
                          <Image
                            src={item.src}
                            width={500}
                            height={500}
                            alt="cart img"
                          />
                        </div>
                        <div className="flex-auto">
                          <p className="text-xl text-white font-medium mb-3">{item.title}</p>
                          <p className="text-xl text-white font-medium mb-8"><span className="mr-2">Price:</span> {item.price}</p>
                          <div className="flex items-center">
                            <div className="flex items-center mr-10">
                              <button className="mr-2" onClick={() => decreaseProductCount(item)}>-</button>
                              <p className="mr-2 text-xl text-white font-medium">{item.quantity}</p>
                              <button onClick={() => addProductCount(item)}>+</button>
                            </div>
                            <p className="text-xl text-white font-medium">Remove</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}