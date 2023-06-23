import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './login_signup/Login'
import SignUp from './login_signup/Signup';
import Adminproduct from './components/admin/adminProduct'
import Adminbuyer from './components/admin/adminBuyer'
import Admincontrol from './components/admin/adminControl'
import HomeContainer from './container/HomeContainer';
import CartContainer from './container/CartContainer';
import HeaderContainer from './container/HeaderContainer'
import UserData from './components/ceo/userData';
import AdminData from './components/ceo/adminData';
import OrderConformation from './components/users/order';

function App() {

  var email = localStorage.getItem("email")
  if (email != null) {
    var type = localStorage.getItem("type")
    if (type === "user") {
      return (
        <div className="App">
          <Router>
            <HeaderContainer />
            <Routes>
              <Route path='/user/shop' element={<HomeContainer />} />
              <Route path='/user/cart' element={<CartContainer />} />
              <Route path='/user/conformorder' element={<OrderConformation />} />
            </Routes>
          </Router>
        </div>
      );
    }
    else if (type == "seller") {
      return (
        <div className="App">
          <Router>
            <HeaderContainer />
            <Routes>
              <Route path='/admin/product' element={<Adminproduct />} />
              <Route path='/admin/detail' element={<Adminbuyer />} />
              <Route path='/admin/control' element={<Admincontrol />} />
              
            </Routes> 
          </Router>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Router>
            <HeaderContainer />
            <Routes>
              <Route path='/ceo/user' element={<UserData />} />
              <Route path='/ceo/admin' element={<AdminData />} />
            </Routes>
          </Router>
        </div>
      );
    }
  }
  else {
    return (
      <div className="App">
        <Router>
          <HeaderContainer />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
