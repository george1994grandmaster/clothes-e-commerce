import { NextResponse } from "next/server";
import { posts } from "./posts";
import { DataItem } from '../../types'; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get('category');
  const dataCount = searchParams.get('dataCount');
  const productId = searchParams.get('productId');
  const productQuery = searchParams.get('productQuery');
  const categorieQuery = searchParams.get('categorieQuery');
  
  
  if (categoryName) {
    const categoryPosts = posts.find((post: any) => categoryName in post) as any;
    let categoryArray = categoryPosts[categoryName];
    if (categoryName === 'products') {
      if(dataCount) {
        categoryArray = categoryPosts[categoryName].slice(0, parseInt(dataCount))
      }
      if(productId) {
        categoryArray = categoryPosts[categoryName][parseInt(productId) - 1];
      }
      if (productQuery) {
        categoryArray = categoryPosts[categoryName].filter((searchItem: DataItem) =>
        searchItem.title.toLowerCase().includes(productQuery)
        );
      }
      if (categorieQuery) {
        categoryArray = categoryPosts[categoryName].filter((item: any) =>
        item.category === categorieQuery)
      }
    } 
    return NextResponse.json(categoryArray);
  }
}