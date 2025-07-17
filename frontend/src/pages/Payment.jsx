import React from 'react';
import '../styles/Payment.css';

function Payment() {
  return (
    <div className="payment-container">
      <form className="payment-form animate-form">
        <h2>Payment</h2>
        <input type="text" placeholder="Cardholder Name" required />
        <input type="text" placeholder="Card Number" required maxLength="16" />
        <div className="payment-row">
          <input type="text" placeholder="MM/YY" required maxLength="5" />
          <input type="text" placeholder="CVV" required maxLength="3" />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
