import { useState, ReactNode } from 'react'
import { GlobalModalContext } from './context'

interface Props {
  children: ReactNode
}

export function ModalProvider({ children }: Props) {
    const [store, setStore] = useState({})

    const showModal = (modalType: string, ModalProps: any = {}) => {
        setStore({
            ...store,
            modalType,
            ModalProps
        })
    }

    const hideModal = () => {
        setStore({
            ...store,
            modalType: null,
            ModalProps: {}
        })
    }


  return <GlobalModalContext.Provider value={{ store, showModal, hideModal }} children={children} />
}