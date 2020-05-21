import React from 'react';
import { Button } from 'react-bootstrap';
import CartModal from './Modal'
const Header = (props) => {

  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href="index.html"><span className="flaticon-pizza-1 mr-1"></span>Pizza <br /><small>Delicous</small>
          </a>
          <CartModal />
        </div>
      </nav>
      <article className="banner">
        <h3>Happiness is pizza with lots of cheese</h3>
        <Button variant="danger">Order Now</Button>{' '}
        <Button variant="warning ">Track Order</Button>
      </article>
    </header>
  );
}

export default Header;
