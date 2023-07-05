import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from './login_signup/Login'
import SignUp from './login_signup/Signup';
import Adminproduct from './components/admin/adminProduct'
import Adminbuyer from './components/admin/adminBuyer'
import Admincontrol from './components/admin/adminControl'
import UserData from './components/ceo/userData';
import AdminData from './components/ceo/adminData';
import Order from './components/users/Order';

import Home from './components/users/home';
import Cart from './components/users/cart';
import Navbar from './components/navbar/navbar'

function App(props) {

  var email = localStorage.getItem("email")

  useEffect(() => {
    if (props.socket) {
      props.socket.on('hello', res => {
        console.log('Check res :- ', res);
      })
    }
  }, [])


  if (email != null) {
    var type = localStorage.getItem("type")
    if (type === "user") {
      return (
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path='/user/shop' element={<Home />} />
              <Route path='/user/cart' element={<Cart />} />
              <Route path='/user/order' element={<Order />} />
            </Routes>
          </Router>
        </div>
      );
    }
    else if (type == "seller") {
      return (
        <div className="App">
          <Router>
            <Navbar />
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
            <Navbar />
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
          <Navbar />
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
