import {createContext, useState, useContext, useEffect} from 'react';
import AuthModal from "../pages/user/auth-modal/AuthModal";
import { jwtDecode } from "jwt-decode";
import axiosBooks from "../util/axiosBooks";
import {useHistory} from "react-router-dom";

const UserContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  user: {}
});

export const UserProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // starts false
  const [user, setUser] = useState({}); // starts as empty object
  const [wishlist, setWishlist] = useState({ merch: [], livro: [] }); // { merch: [], livro: [] }
  const [favStores, setFavStores] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useHistory();

  const isFavorite = (id) => {
    return favStores.includes(id);
  }

  const onWishlist = (id, type) => { // types: 'merch', 'livro'
    return wishlist[type].includes(id);
  }
  const toggleFavStore = async (id) => {
    // toggle on DB
    await axiosBooks.post('user/toggle-fav', { id }, { headers: { 'token-header': token } });
    // toggle locally
    if (isFavorite(id)) {
      const newFav = favStores.filter((s) => s !== id);
      setFavStores(newFav);
    } else {
      setFavStores([...favStores, id]);
    }
  }

  const toggleWishlist = async (id, type) => {
    // toggle on DB
    await axiosBooks.post('user/toggle-from-wishlist', { id, type }, { headers: { 'token-header': token } });
    // toggle locally
    if (onWishlist(id, type)) {
      const newWishlist = wishlist[type].filter((s) => s !== id);
      setWishlist({ ...wishlist, [type]: newWishlist });
    } else {
      setWishlist({ ...wishlist, [type]: [...wishlist[type], id] });
    }
  }

  // User
  const authUser = (token) => {
    // Decode the token
    const decodedToken = jwtDecode(token);
    setUser({...decodedToken});
    localStorage.setItem('token', token); // store token
  }

  const logout = () => {
    setUser({});
    setToken(null);
    localStorage.removeItem("token");
    history.push('/homepage')
  };

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

  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    if (user.exp) {
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return true;
  }

  const getUser = () => {
    const decodedToken = jwtDecode(token);
    setUser({...decodedToken});
  }

  useEffect(() => {
    if (token) {
      isTokenExpired() ? logout() : getUser();
    }
  }, [token]);

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
    toggleWishlist,
    logout,
    token,
    getUser,
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
