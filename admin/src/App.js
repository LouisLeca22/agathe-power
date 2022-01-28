import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import './app.css';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import UserList from './pages/useList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import NewProduct from './pages/newProduct/NewProduct';
import Product from './pages/product/Product';
import ProductList from './pages/productList/ProductList';
import Login from './pages/login/Login';
import { useSelector } from "react-redux";


function App() {
  const user = useSelector( state => state.user.currentUser)
  console.log(user)

  const admin = user?.isAdmin 
  return ( <>
      {admin ? (
        <Router>
          <TopBar />
          <div className='container'>
            <Sidebar />
          
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/user/:userId' element={<User />} />
              <Route path='/newUser' element={<NewUser />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/newProduct' element={<NewProduct />} />
            </Routes>
          </div>
        </Router>
      )
       : (
         <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
         </Router>
      )}
        </>
  );
}

export default App;
