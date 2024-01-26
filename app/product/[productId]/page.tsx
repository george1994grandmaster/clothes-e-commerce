"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, addToCart, decreaseFromCart, addToBasket, getSelectedProduct} from '../../redux/productsSlice'; 
import { displayTotalCount } from '../../redux/cartSlice';
import ShopProductSlider from '../../components/selectedProductSlider';
import Link from 'next/link';
import Image from 'next/image'

interface Props {
  params: {
    productId: any;
  };
}

interface variations {
  src: string;
}

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: any;
  variations: variations[];
}

export default function Product({ params }: Props) {
  const dispatch = useDispatch();
  const viewCurrentProduct = useSelector(getSelectedProduct)
  const [currentProduct, setCurrentProduct] = useState<DataItem | undefined>(undefined);
 
  const products = "products"; 
  
  
  useEffect(() => {
    if(params.productId) {
      const productId = params.productId
      dispatch(getProductById({products, productId}) as any);
      
    }
  }, [dispatch, products, params.productId]);


  useEffect(() => {
   if (viewCurrentProduct) {
      const productId = parseInt(params.productId); 
      const currentProduct = viewCurrentProduct.find(item => item.id === productId);
      setCurrentProduct(currentProduct as DataItem | undefined); 
      console.log(currentProduct)
    }
  });


  const addProductHandler = (productId: number) => {
    if (productId) {
      dispatch(addToCart(productId as number));
    }
  }

  const decreaseProductHandler = (productId: number) => {
    if (productId) {
      dispatch(decreaseFromCart(productId as number));
    }
  }

  const addToBasketHandler = (product: DataItem) => {
    if (product) {
      dispatch(addToBasket(product as DataItem));
      dispatch(displayTotalCount());
    }
  }

  
  return (
    <>
    <div className="container">
        {currentProduct && 
        <div className="flex">
          <div className="sm:w-2/5 flex items-center flex-col">
            <div className="w-full mb-12">
              <ShopProductSlider sliderParams={currentProduct.variations}/>
            </div>
          
            <div className="flex items-center">
              {currentProduct.variations && currentProduct.variations.map((item: variations, idx: number) => (
                <div key={idx} className="variation-img pr-8">
                  <Image
                    src={item.src}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  />
                </div>
              ))
              } 
            </div>
          </div>
        </div>
        }
      </div>
    </>
  );
}