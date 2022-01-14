import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { isMobile } from 'react-device-detect';
import { ModalType, useModalContext } from '../../contexts/Modal/context';
import { NetworkModal } from './NetworkModal';
import { WalletModal } from './WalletModal';

interface ModalProps {
  minHeight?: number;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  padding?: number;
  maxWidth?: number;
  className?: string;
}

export default function BaseModal({
  minHeight = 0,
  maxHeight = 90,
  initialFocusRef,
  children,
  padding = 5,
  maxWidth = 420,
}: ModalProps) {
  const { hideModal, store } = useModalContext();

  return (
    <>
      <Dialog
        as="div"
        onClose={hideModal}
        className="fixed inset-0 z-50 overflow-y-hidden"
        open={store?.modalType ? true : false}
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 backdrop-blur-md opacity-30" />
        <div className="flex items-center justify-center h-screen px-4">
          <div
            className="transition-all transform"
            style={{
              width: isMobile ? `100%` : '80vw',
              maxWidth: `${maxWidth}px`,
            }}
          >
            <div className="w-full p-px rounded bg-gray-900">
              <div className="flex flex-col w-full h-full p-6 overflow-y-scroll rounded">
                <div
                  style={{
                    minHeight: `${minHeight}vh`,
                    maxHeight: `${maxHeight}vh`,
                  }}
                >
                  {store.modalType === ModalType.WALLET_MODAL && (
                    <WalletModal />
                  )}
                  {store.modalType === ModalType.NETWORK_MODAL && (
                    <NetworkModal />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
