import { createContext, useState, useEffect } from 'react';
import { useCycle, Cycle } from 'framer-motion';

type MainContextValue = {
  showHeader: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: Cycle;
  isOpen: boolean;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen(): void;
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isBlock: boolean;
  setIsBlock: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainContext = createContext<MainContextValue>({} as MainContextValue);

export function DataProvider({ children }: any) {
  const [, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isBlock, setIsBlock] = useState(true);

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

  const handleOpen = () => {
    toggleOpen();
    setOpenMenu(true);
  };

  return (
    <MainContext.Provider
      value={{
        showHeader,
        setShowHeader,
        toggleOpen,
        isOpen,
        openMenu,
        setOpenMenu,
        openModal,
        setOpenModal,
        handleOpen,
        isList,
        setIsList,
        isBlock,
        setIsBlock,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
