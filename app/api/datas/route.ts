import { NextResponse } from "next/server";
import { posts } from "./posts";
import { DataItem } from '../../types'; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get('category');
  const dataCount = searchParams.get('dataCount');
  const productId = searchParams.get('productId');
  const productQuery = searchParams.get('productQuery');
  const productCategory = searchParams.get('productCategory');
  
  
  if (categoryName) {
    const categoryPosts = posts.find((post: any) => categoryName in post) as any;
    let result = categoryPosts[categoryName];
    if (categoryName === 'products') {
      if(dataCount) {
        result = categoryPosts[categoryName].slice(0, parseInt(dataCount))
      }
      if(productId) {
        result = categoryPosts[categoryName][parseInt(productId) - 1];
      }
      if (productQuery) {
        result = categoryPosts[categoryName].filter((searchItem: DataItem) =>
        searchItem.title.toLowerCase().includes(productQuery)
        );
      }
      if (productCategory) {
        result = categoryPosts[categoryName].filter((item: any) =>
        item.category === productCategory)
      }
    } 
    return NextResponse.json(result);
  }
}