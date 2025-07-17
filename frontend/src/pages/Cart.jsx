import React from 'react';
import '../styles/Cart.css';

function Cart() {
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items animate-cart">
        {/* Cart items will be listed here */}
        <p>Your cart is empty. Start shopping!</p>
      </div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
