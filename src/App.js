import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ErrorProvider } from "./context/errorContext";
import { UserProvider } from "./context/userContext";
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
import Checkout from "./pages/user/checkout/Checkout";
import Favorites from "./pages/user/Favorites";
import PurchaseDetails from "./pages/user/purchase_details/PurchaseDetails";
import ShoppingCart from "./pages/user/shopping_cart/ShoppingCart";
import EditPersonalInfo from "./pages/user/User/edit/editPersonal/EditPersonalInfo";
import EditPaymentInfo from "./pages/user/User/edit/editPayment/EditPaymentInfo";
import NavBar from "./pages/navbar/NavBar";
import Community from "./pages/community/Community";
import PrivateRoute from "./util/PrivateRoute";

function App() {
  return <BrowserRouter>
    <ErrorProvider>
    <UserProvider>
    <div className="App">
      <NavBar/>
      <Switch>
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
        <PrivateRoute path={"/profile"} component={User}/>
        <PrivateRoute path={"/favorites"} component={Favorites}/>
        <PrivateRoute path={"/shopping-cart"} component={ShoppingCart}/>
        <PrivateRoute path={"/purchase-details"} component={PurchaseDetails}/>
        <PrivateRoute path={"/checkout"} component={Checkout}/>
        <PrivateRoute path={"/edit-personal"} component={EditPersonalInfo}/>
        <PrivateRoute path={"/edit-payment"} component={EditPaymentInfo}/>
        <PrivateRoute path={"/community/"} component={Community}/>
        <Redirect to={"/homePage"}/>
      </Switch>
    </div>
    </UserProvider>
    </ErrorProvider>
  </BrowserRouter>
}

export default App;
