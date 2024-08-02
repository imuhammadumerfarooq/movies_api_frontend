// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AddMovie, Cart, Checkout, MovieList, Signin, Signup, Success, Transactions} from './pages'
import { Navbar , EditMovie } from './components';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 container mx-auto p-4">
            <Navbar />
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/edit/:id" element={<EditMovie />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Signin />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
