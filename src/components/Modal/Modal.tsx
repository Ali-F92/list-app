import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeCloseModal } from './hooks/use-escape-close-modal';
import { useAppendModalRoot } from './hooks/use-append-modal-root';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  overlayClassName?: string;
  modalClassName?: string;
  closeOnOverlayClick?: boolean;
}

export default function Modal({ children, onClose, isOpen, overlayClassName, modalClassName, closeOnOverlayClick }: ModalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement('div');
  }
  useEscapeCloseModal(isOpen, onClose);
  useAppendModalRoot(portalRef.current, isOpen);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/40 flex justify-center items-center z-50 ${overlayClassName}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white p-6 rounded-lg max-w-[90%] w-full max-h-[90vh] overflow-y-auto relative ${modalClassName}`}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors`}
          aria-label="Close modal"
        >
          <CloseOutlined className="text-lg" />
        </button>
        {children}
      </div>
    </div>,
    portalRef.current
  );
}