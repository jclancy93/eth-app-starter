import { createContext, useContext } from 'react'

export enum ModalType {
  WALLET_MODAL = 'WALLET_MODAL',
  NETWORK_MODAL = 'NETWORK_MODAL'
}

type ContextType = {
    showModal: (modalType: ModalType, modalProps: any) => void;
    hideModal: () => void;
    store: any;
}

const initalState: ContextType = {
    showModal: () => {},
    hideModal: () => {},
    store: {}
  };
  

export const GlobalModalContext = createContext(initalState)

export function useModalContext() {
    return useContext(GlobalModalContext);
}
