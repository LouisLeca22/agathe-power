import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList"
import Register from "./pages/Register";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "./redux/categoryRedux";
import { useDispatch } from 'react-redux';
import { publicRequest } from "./requestMethods";


function App() {
  const user = useSelector( state => state.user.currentUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const getCategories = async () => {
      const res = await publicRequest.get("/categories")
      dispatch(fetchCategories(res.data))
    }

    getCategories()
  })

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register /> } />
      </Routes>
    </Router>
  );
}

export default App;
