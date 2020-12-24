import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./AppComponents/Guest/landingPage/LandingPage"
import Dashboard from "./AppComponents/User/Dashboard"
import OpenOder from "./AppComponents/User/OpenOder"
import ClosedOder from "./AppComponents/User/ClosedOder"
import EditProfile from "./AppComponents/User/EditProfile"
import Cart from "./AppComponents/User/cart/Cart";
import SignIn from "./AppComponents/Auth/Signin";
import SignUp from "./AppComponents/Auth/Signup";

import { Provider } from "react-redux";
import store from "./Redux/store"
import Password from "./AppComponents/User/Password";
import Checkout from "./AppComponents/User/Checkout";
import WithAuth from "./WithAuth";

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <LandingPage {...props} />;
              }}
            />
            <Route {...props} exact path="/checkout" component={WithAuth(Checkout)} />
            <Route {...props} exact path="/account" component={WithAuth(Dashboard)} />
            <Route {...props} exact path="/account/edit" component={WithAuth(EditProfile)} />
            <Route {...props} exact path="/account/open" component={WithAuth(OpenOder)} />
            <Route {...props} exact path="/account/close" component={WithAuth(ClosedOder)} />
            <Route {...props} exact path="/account/password" component={WithAuth(Password)} />
            
            <Route
              exact
              path="/cart"
              render={(props) => {
                return <Cart {...props} />;
              }}
            />
            <Route
              exact
              path="/signin"
              render={(props) => {
                return <SignIn {...props} />;
              }}
            />
            <Route
              exact
              path="/signup"
              render={(props) => {
                return <SignUp {...props} />;
              }}
            />
          </Switch>
        </div>
     </Router>
    </Provider>
  );
}

export default App;
