import { createContext, useState } from 'react';

interface ModalContextValue {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextValue>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

const ModalProvider = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const contextValue: ModalContextValue = {
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
