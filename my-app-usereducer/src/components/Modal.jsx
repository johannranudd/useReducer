import React, { useEffect } from 'react';

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    const timeout = setTimeout((prev) => {
      prev = closeModal();
      return prev;
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [closeModal]);
  return <div>{modalContent}</div>;
};

export default Modal;
