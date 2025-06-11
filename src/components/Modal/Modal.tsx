import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  overlayClassName?: string;
  modalClassName?: string;
  closeOnOverlayClick?: boolean;
}

export default function Modal({ children, onClose, isOpen, overlayClassName, modalClassName, closeOnOverlayClick }: ModalProps) {
  const el = document.createElement('div');

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
      return;
    }

    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/40 flex justify-center items-center z-50 ${overlayClassName}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white p-6 rounded-lg max-w-[90%] w-full max-h-[90vh] overflow-y-auto relative ${modalClassName}`}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-gray-500 hover:text-gray-700`}
          aria-label="Close modal"
        >
          <CloseOutlined className="text-lg" />
        </button>
        {children}
      </div>
    </div>,
    el
  );
}