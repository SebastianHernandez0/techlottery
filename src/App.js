import './App.css';
import Home from './pages/home/Home';
import SignUp from './pages/singup/SignUp';
import SignIn from './pages/singin/SignIn';
import Rifas from './pages/rifas/rifas';
import {Route,Routes} from 'react-router-dom';
import ProductDetail from './pages/rifas/detailProduct';
import AdminSorteos from './pages/admin/adminSorteos';
import AddSorteos from './pages/admin/addSorteo';
import { CartProvider } from './context/CartContext';
import Cart from './pages/cart/Cart';
import Pago from './pages/pagos/Pago';
function App() {
  return (
    <div className="App">
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/rifas" element={<Rifas />} />
        <Route path="/rifas/:sorteoId" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminSorteos />} />
        <Route path="/admin/agregarSorteo" element={<AddSorteos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pago" element={<Pago />} />
        
      </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
