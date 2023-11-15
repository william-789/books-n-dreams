import { createContext, useState, useContext } from 'react';
import AuthModal from "../pages/user/auth-modal/AuthModal";

// Create a context with initial state values and a function to update the state
const UserContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

// Create a provider component that will wrap your app
export const UserProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // starts false

  // Modal controllers
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const contextValues = {
    modalIsOpen,
    openModal,
    closeModal,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}

      {modalIsOpen && <AuthModal onClose={closeModal} />}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;

export const useUser = () => { // Custom hook
  return useContext(UserContext);
};
