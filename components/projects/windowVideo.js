import './windowVideoStyle.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import VideoPreview from './videoPreview';

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

export default function WindowVideo({ children, title, videoLink }) {
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
      <VideoPreview handleOpen={handleOpen} button={children} videoLink={videoLink} />
      {isOpen && (
        <Modal containerClassName={(fadingIn && 'container-appear') || (fadingOut && 'container-disappear')} windowClassName={(fadingIn && 'window-appear') || (fadingOut && 'window-disappear')} onClose={handleClose} title={title}>
          <video className="max-w-[80vw] max-h-[80vh]" autoPlay loop muted>
            <source src={videoLink} />
          </video>
        </Modal>
      )}
    </>
  );
}
