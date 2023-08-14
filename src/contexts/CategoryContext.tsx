import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Category {
  catId: number | null;
  name: string | null;
}

interface CategoryContextValue {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const initialState: Category[] = [
  {
    catId: null,
    name: null,
  },
];

const CategoryContext = createContext<CategoryContextValue>({
  categories: initialState,
  setCategories: () => {},
});

const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>(initialState);

  const token = localStorage.getItem('token');

  if (token) {
    //set all of request headers to have this configuration
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchCategories = async () => {
    const { data: response } = await axios.get('http://localhost:8080/cats');

    setCategories(response.data.categories);
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    } else {
      setCategories(initialState);
    }
  }, [token]);

  const contextValues: CategoryContextValue = {
    categories,
    setCategories,
  };

  return (
    <CategoryContext.Provider value={contextValues}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
