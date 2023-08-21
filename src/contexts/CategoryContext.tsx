import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utilities/config';
import Loader from '../components/loaders/Loader';

export interface Category {
  categoryID: number | null;
  name: string | null;
}

export interface CategoryContextValue {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isLoading: boolean;
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: Category[] = [
  {
    categoryID: null,
    name: null,
  },
];

const CategoryContext = createContext<CategoryContextValue>({
  categories: initialState,
  setCategories: () => {},
  isLoading: true,
  setIsloading: () => {},
});

const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>(initialState);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const token = localStorage.getItem('token');

  if (token) {
    //set all of request headers to have this configuration
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchCategories = async () => {
    try {
      const { data: response } = await axios.get(`${config.APP_BASE_URL}/cats`);
      setCategories(response.data.categories);
      setIsloading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    } else {
      setCategories(initialState);
      setIsloading(false);
    }
  }, [token]);

  const contextValues: CategoryContextValue = {
    categories,
    setCategories,
    isLoading,
    setIsloading,
  };

  return (
    <CategoryContext.Provider value={contextValues}>
      {isLoading ? <Loader /> : children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
