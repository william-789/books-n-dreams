import { createContext, useState, useContext } from 'react';
import AuthModal from "../pages/user/auth-modal/AuthModal";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  user: {}
});

export const UserProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // starts false
  const [user, setUser] = useState({}); // starts as empty object

  // User
  const authUser = (token) => {
    // Decode the token
    const decodedToken = jwtDecode(token);
    setUser({...decodedToken});
    localStorage.setItem('token', token); // store token
  }

  const isLogged = () => {
    return !!user.id;
  }

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
    authUser,
    isLogged
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
