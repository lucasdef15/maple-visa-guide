import { createContext, useState, useEffect } from 'react';
import { useCycle, Cycle } from 'framer-motion';

type MainContextValue = {
  showHeader: boolean; // showHeader
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>; // setShowHeader
  toggleOpen: Cycle; // toggleOpen
  isOpen: boolean; // isOpen
};

const MainContext = createContext<MainContextValue>({} as MainContextValue);

export function DataProvider({ children }: any) {
  const [, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true); // Use showheader here

  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || window.pageYOffset;
      setScrollPosition(position);

      setShowHeader(position < lastScrollPosition);
      setLastScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <MainContext.Provider
      value={{ showHeader, setShowHeader, toggleOpen, isOpen }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
