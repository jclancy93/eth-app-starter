import { ModalType, useModalContext } from '../contexts/Modal'

export function useModals() {
  const { showModal, hideModal, store } = useModalContext()

  return {
    showWalletModal: () => showModal(ModalType.WALLET_MODAL, {}),
    hideModal,
    store
  }
}