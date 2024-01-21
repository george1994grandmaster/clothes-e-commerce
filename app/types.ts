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

export interface SliderProps {
  id: number;
  title: string;
  category: string;
  src: string;
  price: string;
  quantity: number
}

export interface Sliderİtems {
  sliderParams: SliderProps[]; 
}

export interface AnimatedText {
  textColor: string;
  bgColor?: string; 
  border?: string;
}