import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const coffeeProducts = [
  {
    id: 1,
    name: 'Espresso',
    price: 100,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 150,
    image: 'https://images.unsplash.com/photo-1534687941688-651ccf1e2bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Latte',
    price: 200,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(?:254|\+254|0)?([7-9]{1}[0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Safaricom phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/pay', {
        phone: phoneNumber,
        amount: selectedProduct.price
      });

      if (response.data.CheckoutRequestID) {
        alert('STK Push sent! Please authorize payment on your phone.');
        setShowModal(false);
        setPhoneNumber('');
      }
    } catch (error) {
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="products-grid">
        {coffeeProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="price">KES {product.price}</p>
            <button
              className="buy-button"
              onClick={() => handleBuyClick(product)}
            >
              Buy with M-PESA
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Enter M-PESA Number</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="e.g., 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
              {error && <p className="error">{error}</p>}
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay KES ' + selectedProduct.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 