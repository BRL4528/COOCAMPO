import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

import { Conatiner } from './styles';

interface IModalProps {
  children: unknown;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <Conatiner>
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            marginTop: '45px',
            transform: 'translate(-50%, -50%)',
            background: '#F8F8FB',
            color: '#000000',
            borderRadius: '4px',
            width: '50%',
            maxHeight: '90%',
            border: 'none',
          },
          overlay: {
            backgroundColor: 'rgb(41, 41, 56, 0.4)',
          },
        }}
      >
        {children}
      </ReactModal>
    </Conatiner>
  );
};

export default Modal;
