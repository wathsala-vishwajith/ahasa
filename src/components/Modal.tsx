import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div 
        style={{
          ...styles.modal,
          background: isDarkMode ? '#1f2937' : '#fff',
          color: isDarkMode ? '#f9fafb' : '#1f2937',
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          style={{
            ...styles.closeButton,
            color: isDarkMode ? '#f9fafb' : '#1f2937',
          }} 
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: window.innerWidth <= 768 ? '10px' : '20px',
  },
  modal: {
    background: '#fff',
    padding: window.innerWidth <= 768 ? '16px' : '20px',
    borderRadius: '16px',
    position: 'relative',
    width: '95%',
    maxWidth: '800px',
    maxHeight: window.innerWidth <= 768 ? 'calc(100vh - 20px)' : '95vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default Modal; 