"use client"


import { useEffect, useState } from 'react';
import AnimatedText from '../components/animatedText';
import { DataItem } from '../types';

export default function Checkout() {

  const [getCartFromStorage, setCartFromLocalStorage] = useState<DataItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartFromLocalStorage(cartFromLocalStorage);
    console.log(getCartFromStorage)
  },[]); 

 
  useEffect(() => {
    const totalSum = getCartFromStorage.reduce((accumulator: any, currentItem: any) => {
      const price = parseFloat(currentItem.price.replace(',', '.'));
      return accumulator + price;
    }, 0);
    const formattedTotalSum = totalSum.toLocaleString('en-US', { minimumFractionDigits: 2 });
    const finalTotalSum = formattedTotalSum.replace('.', ',');
  
    setTotalPrice(finalTotalSum);
  }, [getCartFromStorage]);

  
  return (
  <>
    <AnimatedText bgColor="yellow" textColor="dark"/>
    <div className="py-20">
      <div className="container">
        <form action="">
          <div className="flex flex-wrap justify-center">
            <div className="md:w-1/2 px-11">
              <p className="text-xl text-lightGrey font-medium mb-5">Personel information</p>
              <div className="w-full h-px bg-lightGrey mb-5"></div>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-4 py-4">
                  <label className="block">
                    <p className="block mb-1">Name*</p>
                    <input type="text" className="w-full p-2 bg-transparent border border-white outline-none"/>
                  </label>
                </div>
                <div className="w-1/2 pl-4 py-4">
                  <label className="block">
                  <p className="block mb-1">Surname*</p>
                    <input type="text" className="w-full p-2 bg-transparent border border-white outline-none"/>
                  </label>
                </div>
                <div className="w-full py-4">
                  <label className="block">
                    <p className="block mb-1">Address*</p>
                    <input type="text" className="w-full p-2 bg-transparent border border-white outline-none"/>
                  </label>
                </div>
                <div className="w-1/2 pr-4 py-4">
                  <label className="block">
                    <p className="block mb-1">Phone number*</p>
                    <input type="text" className="w-full p-2 bg-transparent border border-white outline-none"/>
                  </label>
                </div>
                <div className="w-1/2 pl-4 py-4">
                  <label className="block">
                  <p className="block mb-1">Email*</p>
                    <input type="email" className="w-full p-2 bg-transparent border border-white rounded outline-none"/>
                  </label>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 px-11">
              <p className="text-xl text-lightGrey font-medium mb-5">Billing Summary</p>
              <div className="w-full h-px bg-lightGrey mb-5"></div>
              <div className="flex flex-wrap justify-between mb-9">
                <p className="text-xl text-lightGrey font-medium">Order Review</p>
                <p className="text-base text-lightGrey font-medium">{getCartFromStorage.length} items in cart</p>
              </div>
              <div className="flex flex-wrap justify-between mb-8">
                <p className="text-xl text-darkTransparent font-medium">Subtotal</p>
                <p className="text-base text-darkTransparent font-medium">${totalPrice}</p>
              </div>
              <div className="w-full h-px bg-lightGrey mb-5"></div>
              <div className="flex flex-wrap justify-between mb-8">
                <p className="text-xl text-lightGrey font-medium">Total</p>
                <p className="text-base text-yellow font-medium">${totalPrice}</p>
              </div>
              <div className="mb-5">
                <label>
                  <p className="text-xl text-lightGrey font-medium mb-1">Order Comment</p>
                  <textarea className="w-full h-32 p-2 bg-dark border border-white outline-none resize-none" placeholder="Type here"></textarea>
                </label>
              </div>
              <div className="mb-5">
                <label className="">
                  <input type="checkbox" className="form-checkbox h-4 w-4 rounded-md mr-2" />
                  <span className="text-lg text-lightGrey font-medium">Please check to acknowledge our <span className="text-lg text-yellow font-medium">Privacy & Terms Policy</span></span>
                </label>
              </div>
              <button className="w-full bg-yellow text-dark py-3 px-5 text-center font-bold">PAY ${totalPrice}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <AnimatedText bgColor="orange" textColor="dark"/>
  </>
    
  )
} 