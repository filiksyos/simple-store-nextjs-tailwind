"use client";

import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 20, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 30, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: 40, image: 'https://via.placeholder.com/150' },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Store</h1>
      <div className="flex">
        <div className="w-3/4">
          <h2 className="text-xl font-bold mb-2">Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-2">
                <img src={product.image} alt={product.name} className="mb-2" />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="font-bold mt-2">Total: ${calculateTotal()}</div>
        </div>
      </div>
    </div>
  );
}