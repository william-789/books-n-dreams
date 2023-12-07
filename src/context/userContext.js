import { createContext, useState, useContext } from 'react';
import AuthModal from "../pages/user/auth-modal/AuthModal";
import { jwtDecode } from "jwt-decode";
import axiosBooks from "../util/axiosBooks";

const UserContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  user: {}
});

export const UserProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true); // starts false
  const [user, setUser] = useState({}); // starts as empty object
  const [wishlist, setWishlist] = useState({ merch: [], livro: [] }); // { merch: [], livro: [] }
  const [favStores, setFavStores] = useState([]);

  const isFavorite = (id) => {
    return favStores.includes(id);
  }

  const onWishlist = (id, type) => { // types: 'merch', 'livro'
    return wishlist[type].includes(id);
  }
  const toggleFavStore =  async (id) => { // called only if user is logged
    // toggle on DB
   await axiosBooks.post('user/toggle-fav', {params: {id}})
    // toggle locally
    if(isFavorite(id)) {
      const newFav = favStores.filter((s) => s !== id)
      setFavStores(newFav)
    } else {
        setFavStores([...favStores,id])
    }
  }

  const toggleWishlist = async (id, type) => { // called only if user is logged
    // toggle on DB
    await axiosBooks.post('user/toggle-from-wishlist', {params:{ id, type }})
    // toggle locally
    if(onWishlist(id, type)) {
      const newWishlist = wishlist[type].filter((s) => s !== id)
      setWishlist({...wishlist, type: newWishlist})
    } else {
      setWishlist({...wishlist, type: [...wishlist[type], id]})
    }
  }

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
    user,
    isLogged,
    isFavorite,
    onWishlist,
    toggleFavStore,
    toggleWishlist
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
