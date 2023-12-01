import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ErrorProvider } from "./context/errorContext";
import { UserProvider } from "./context/userContext";
import LogIn from "./pages/login_register/LogIn";
import Register from "./pages/login_register/Register";
import Home from "./pages/home/Home";
import AuthorDetails from "./pages/details/AuthorDetails/AuthorDetails";
import BookDetails from "./pages/details/BookDetails/BookDetails";
import BookshopDetails from "./pages/details/BookshopDetails/BookshopDetails";
import MerchDetails from "./pages/details/MerchDetails/MerchDetails";
import GeneralSearch from "./pages/search/generalSearch/GeneralSearch";
import AuthorSearch from "./pages/search/authorSearch/AuthorSearch";
import BookSearch from "./pages/search/bookSearch/BookSearch";
import BookshopSearch from "./pages/search/bookshopSearch/BookshopSearch";
import MerchSearch from "./pages/search/merchSearch/MerchSearch";
import User from "./pages/user/User/User";
import Checkout from "./pages/user/Checkout";
import Favorites from "./pages/user/Favorites";
import PurchaseDetails from "./pages/user/purchase_details/PurchaseDetails";
import ShoppingCart from "./pages/user/shopping_cart/ShoppingCart";
import EditPersonalInfo from "./pages/user/EditPersonalInfo";
import EditPaymentInfo from "./pages/user/EditPaymentInfo";
import NavBar from "./pages/navbar/NavBar";

function App() {
  return <BrowserRouter>
    <ErrorProvider>
    <UserProvider>
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path={"/logIn"} component={LogIn}/>
        <Route path={"/register"} component={Register}/>
        <Route path={"/homePage"} component={Home}/>
        <Route path={"/author/:id"} component={AuthorDetails}/>
        <Route path={"/book/:id"} component={BookDetails}/>
        <Route path={"/bookstore/:id"} component={BookshopDetails}/>
        <Route path={"/merch/:id"} component={MerchDetails}/>
        <Route path={"/search"} component={GeneralSearch}/>
        <Route path={"/search-author"} component={AuthorSearch}/>
        <Route path={"/search-book"} component={BookSearch}/>
        <Route path={"/search-bookshop"} component={BookshopSearch}/>
        <Route path={"/search-merch"} component={MerchSearch}/>
        <Route path={"/profile"} component={User}/>
        <Route path={"/favorites"} component={Favorites}/>
        <Route path={"/shopping-cart"} component={ShoppingCart}/>
        <Route path={"/purchase-details"} component={PurchaseDetails}/>
        <Route path={"/checkout"} component={Checkout}/>
        <Route path={"/edit-personal"} component={EditPersonalInfo}/>
        <Route path={"/edit-payment"} component={EditPaymentInfo}/>
        <Redirect to={"/homePage"}/>
      </Switch>
    </div>
    </UserProvider>
    </ErrorProvider>
  </BrowserRouter>
}

export default App;
