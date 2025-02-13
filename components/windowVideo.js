import './windowVideoStyle.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Modal = ({ onClose, children, title }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className=" z-[999]  flex justify-center items-center w-full h-full bg-black bg-opacity-50 fixed top-0 left-0">
      <div className=" bg-background pixel-border-window w-fit flex flex-col justify-center items-center p-[12px] pt-1">
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

export default function WindowVideo({ button, title, videoLink }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="pixel-button p-1 px-3 font-black hover:opacity-70 transition-opacity">
        {button}
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title={title}>
          <video width={400} autoPlay loop muted>
            <source src={videoLink} />
          </video>
        </Modal>
      )}
    </>
  );
}
