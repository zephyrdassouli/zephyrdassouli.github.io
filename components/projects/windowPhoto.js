import './photoPreviewStyle.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useState } from 'react';
import PhotoPreview from './photoPreview';

const Modal = ({ windowClassName, containerClassName, onClose, children, title }) => {
  // Called when the close button is clicked (X)
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={`${containerClassName} z-[999] flex justify-center items-center w-full h-full bg-black bg-opacity-50 fixed top-0 left-0`}>
      <div className={`${windowClassName} modal-window bg-background pixel-border-window w-fit flex flex-col justify-center items-center p-[12px] pt-1`}>
        <div className="w-full pt-2 pb-2 pr-1 flex justify-between">
          <div className="font-black">{title.toUpperCase()}</div>
          <button className="text-2xl relative bottom-1 px-2" onClick={handleCloseClick}>
            x
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default function WindowPhoto({ children, title, photoLink }) {
  const [isOpen, setIsOpen] = useState(false);

  // Modal fade in/out control
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  // Handles the opening of the modal
  const handleOpen = () => {
    setIsOpen(true);
    setFadingIn(true);
    setTimeout(() => {
      setFadingIn(false);
    }, 600);
  };

  // Handles the closing of the modal
  const handleClose = () => {
    setFadingOut(true);
    setTimeout(() => {
      setFadingOut(false);
      setIsOpen(false);
    }, 600);
  };

  return (
    <>
      <PhotoPreview handleOpen={handleOpen} button={children} photoLink={photoLink} />
      {isOpen && (
        <Modal containerClassName={(fadingIn && 'container-appear') || (fadingOut && 'container-disappear')} windowClassName={(fadingIn && 'window-appear') || (fadingOut && 'window-disappear')} onClose={handleClose} title={title}>
          <Image className="max-w-[80vw] w-fit h-fit max-h-[80vh] object-contain" width={1000} height={0} src={photoLink} alt={title} />
        </Modal>
      )}
    </>
  );
}
