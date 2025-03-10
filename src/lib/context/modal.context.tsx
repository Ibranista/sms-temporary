'use client';

import { createContext, ReactNode, useState } from 'react';

interface IModalState {
  onClose: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthType: React.Dispatch<React.SetStateAction<'signIn' | 'signUp' | null>>;
  authType: 'signIn' | 'signUp' | null;
}

interface ModalContextType {
  modalState: IModalState;
}

export const ModalContext = createContext<ModalContextType>({
  modalState: {
    onClose() {},
    isOpen: false,
    authType: null,
    setAuthType: () => null,
    setIsOpen: () => false,
  },
});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [authType, setAuthType] = useState<'signIn' | 'signUp' | null>(null);

  const onClose = () => {
    document.body.style.overflow = 'unset';
    setIsOpen(false);
    setAuthType(null);
  };

  const modalState: IModalState = {
    onClose,
    isOpen,
    setIsOpen,
    authType,
    setAuthType,
  };

  return <ModalContext.Provider value={{ modalState }}>{children}</ModalContext.Provider>;
};
