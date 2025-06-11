import { useEffect } from "react";

export function useAppendModalRoot(currentElement: HTMLDivElement | null, isOpen: boolean) {
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    if (!isOpen || !modalRoot || !currentElement) {
      return;
    }

    modalRoot.appendChild(currentElement);

    return () => {
      modalRoot.removeChild(currentElement);
    };
  }, [isOpen]);
}