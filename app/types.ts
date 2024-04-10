export interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
}

export interface DataState {
  products: DataItem[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  cart: DataItem[],
  productQuantity: DataItem[],
}

export interface CategorieDataState {
  data: DataItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ProductDataState {
  products: DataItem[];
  selectedProducts: DataItem[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  cart: DataItem[],
  productQuantity: any,
}

export interface Sidebar {
  data: DataItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface productsCount {
  totalCount: number | null
}

export interface CartItem {
  quantity: number;
}

export interface AnimatedText {
  textColor: string;
  bgColor?: string; 
  border?: string;
}

export interface variations {
  src: string;
}

export interface SliderProps {
  id: number;
  title: string;
  category: string;
  src: string;
  price: string;
  quantity: number;
}

export interface SliderItems {
  sliderParams: (SliderProps | variations)[];
}

export interface ProductSliderItems {
  products: DataItem[];
  slideIndex: number;
}

export interface Navlink {
  label: string;
  href: string;
};

export interface NavlinkProps {
  navlinks: Navlink[];
};

export interface ProductProps {
  params: {
    productId: string;
  };
}

export interface ProductSize {
  size: string;
}

export interface Variations {
  src: string;
}

export interface ProductDataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
  description: string;
  variations: Variations[];
  productSize: ProductSize[]
}

export interface CategoryNameProps {
  params: {
    categoryName: string;
  };
}

