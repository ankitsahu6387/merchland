import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>Find a Store</li>
            <li>Launch a Store</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>Order Status</li>
            <li>Delivery</li>
            <li>Return Policy</li>
            <li>Payment Options</li>
            <li>Inquiries</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Merchland</li>
            <li>News</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;