"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import {addProduct, decreaseProduct} from '../redux/productsSlice'; 
import AnimatedText from '../components/animatedText';
import Image from 'next/image'
import RemoveBox from '../components/svg/removeBox';


interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
}


export default function GetCategorieResult() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getCartFromStorage, setCartFromLocalStorage] = useState<DataItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);

 
  useEffect(() => {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartFromLocalStorage(cartFromLocalStorage);
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

  
  const addProductCount = (product: DataItem) => {
    if (product.quantity) {
      dispatch(addProduct(product as DataItem));
      let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      setCartFromLocalStorage(cartFromLocalStorage);
    }
  }
  
  const decreaseProductCount = (product: DataItem) => {
    if (product.quantity && product.quantity > 1) {
      dispatch(decreaseProduct(product as DataItem));
      let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      setCartFromLocalStorage(cartFromLocalStorage);
    }
  }


  const removeProduct = (id: number) => {
    let cartFromLocalStorage: DataItem[] = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
    cartFromLocalStorage = cartFromLocalStorage.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
    setCartFromLocalStorage(cartFromLocalStorage);
  }
  
  
  return (
    <>
      <AnimatedText bgColor="yellow" textColor="dark"/>
      <div className="container">
        <div className="w-11/12 mx-auto py-20">
          <h3 className="text-3xl text-white font-bold text-center mb-12">YOUR CART</h3>
          {
            getCartFromStorage && 
            <>
              <p className="text-2xl text-white font-medium mb-8">items summary
              <span className="text-yellow ml-1">
                ({getCartFromStorage.length})
              </span>
              </p>
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-3/5 md:mb-0 mb-20">
                  <div className="flex flex-col gap-y-20">
                    {getCartFromStorage.map((item: DataItem) => (
                      <div key={item.id} className="flex sm:flex-row flex-col sm:items-center gap-x-20">
                        <div className="cart-img mb-10 sm:mb-0">
                          <Image
                            src={item.src}
                            width={500}
                            height={500}
                            alt="cart img"
                          />
                        </div>
                        <div className="flex-auto">
                          <p className="text-xl text-white font-medium mb-3">{item.title}</p>
                          <p className="text-xl text-white font-medium mb-8"><span className="mr-2">Price:</span> $ {item.price}</p>
                          <div className="flex items-center">
                            <div className="flex items-center mr-10">
                              <button className="mr-2" onClick={() => addProductCount(item)}>&#x2B;</button>
                              <p className="mr-2 text-xl text-white font-medium">{item.quantity}</p>
                              <button onClick={() => decreaseProductCount(item)}>&#8722;</button>
                            </div>
                            <button className="flex items-center hover-remove" onClick={ () => removeProduct(item.id)}>
                              <span className="mr-2">
                                <RemoveBox/>
                              </span>
                              <span className="text-xl text-white font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {totalPrice && 
                <div className="w-full md:w-2/5 md:pl-10">
                  <p className="text-2xl text-white font-medium mb-8">Order summary</p>
                  <div className="mb-8 p-8 border border-l-lightGrey">
                    <div className="flex justify-between mb-8">
                      <p className="text-xl font-medium">Subtotal:</p>
                      <span className="text-xl font-medium">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between mb-8">
                      <p className="text-xl font-medium">All Your Discounts:</p>
                      <span className="text-xl font-medium">-</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xl font-medium">Grandtotal:</p>
                      <span className="text-xl font-medium">${totalPrice}</span>
                    </div>
                  </div>
                  <button className="w-full bg-yellow text-dark py-3 px-5 text-center font-bold hover:bg-orange transition duration-200" onClick={() => router.push('/checkout')}>CHECKOUT</button>
                </div>
                }
              </div>
            </>
          }
        </div>
      </div>
      <AnimatedText bgColor="orange" textColor="dark"/>
    </>
  );
}