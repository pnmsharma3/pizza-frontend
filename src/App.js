import React, { useState, useEffect,useRef } from 'react';

import './Assets/Style/style.scss';
import Menu from './Components/Menu';
import Service from './Components/Service'
import { Button } from 'react-bootstrap';
import CartModal from './Components/Modal'

function App() {
  const [selectedPizza, setSelectedPizza] = useState([]);
  const [isScroll, setIsScroll] = useState(false)
  const myRef = useRef(null)
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY > 100 ;
      if (isScroll !== scroll) {
        setIsScroll(scroll)
      }
    })
  })
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
  const executeScroll = () => scrollToRef(myRef)

  const cartList=(pizzas)=>{
    setSelectedPizza(pizzas);
   } 
  return (
    <div className="App">
      <header className="App-header">
      <nav className={`navbar navbar-expand-lg${!!isScroll?'navbar-dark bg-dark':''}`}>
        <div className="container">
          <a className="navbar-brand"><span className="flaticon-pizza-1 mr-1"></span>Pizza <br /><small>Delicous</small>
          </a>
          <CartModal cartList={selectedPizza}/>
        </div>
      </nav>
      <article className="banner">
        <h3>Happiness is pizza with lots of cheese</h3>
        <Button variant="danger" onClick={executeScroll} >Order Now</Button>{' '}
        <Button variant="warning ">Track Order</Button>
      </article>
    </header>

      <Service/>
      <section className=" menu-container" ref={myRef} >
      <Menu addToCart={(pizzas)=>cartList(pizzas)}  />
        </section>
     
     <article >
     contact us
     </article>
    </div>
  );
}

export default App;
