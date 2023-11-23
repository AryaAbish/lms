import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import AdminHeader from './pages/AdminHeader';
import Users from './pages/Users';
import Singleview from './pages/Singleview';
import Cart from './pages/Cart';
import Cartlog from './pages/Cartlog';
import Paysuccess from './pages/Paysuccess';
import Pnf from './pages/Pnf';
import Myorders from './pages/Myorders';
import Orders from './pages/Orders';
import Whishlist from './pages/Whishlist';
import Whishlistlog from './pages/Whishlistlog';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/mainHome' element={<Main></Main>}></Route>
        <Route path='/adminheader' element={<AdminHeader></AdminHeader>}></Route>
        <Route path='/users' element={<Users></Users>}></Route>
        <Route path='/single/:id' element={<Singleview></Singleview>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/cartlog' element={<Cartlog></Cartlog>}></Route>
        <Route path='/paysuccess' element={<Paysuccess></Paysuccess>}></Route>
        <Route path='*' element={<Pnf></Pnf>}></Route>
        <Route path='/myorders' element={<Myorders></Myorders>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/whishlist' element={<Whishlist></Whishlist>}></Route>
        <Route path='/whishlistlog' element={<Whishlistlog></Whishlistlog>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
