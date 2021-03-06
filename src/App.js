import React, { useState, useEffect, useRef } from 'react';
import './Assets/Style/style.scss';
import Menu from './Components/Menu';
import Service from './Components/Service'
import logo from './Assets/Images/pizza.png'
import { Button } from 'react-bootstrap';
import CartModal from './Components/Modal'
import Alert from './Components/alert'
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest?symbols=USD';
const deliveryCost = 4;
const ApiHost = 'https://still-ocean-87361.herokuapp.com/';

function App() {
  const [selectedPizza, setSelectedPizza] = useState([]);
  const [isScroll, setIsScroll] = useState(false)
  const [currency, setCurrency] = useState('€');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const [removedId, setRemovedId] = useState(null);
  const myRef = useRef(null)

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY > 100;
      if (isScroll !== scroll) {
        setIsScroll(scroll)
      }
    });

    fetch(EXCHANGE_URL).then(res => res.json()).then(data => {
      setExchangeRate(data.rates.USD)
    })
  })

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  const executeScroll = () => scrollToRef(myRef)

  const cartList = (pizzas) => {
    pizzas.map(p => p.quantity = 1)
    setSelectedPizza(pizzas);
  }

  const onSuccessfulOrder = ({ orderId }) => {
    setOrderId(orderId);
    setRemovedId('all');
  }

  const cartUpdate = (id) => {
    setSelectedPizza(id !== 'all' ? selectedPizza.filter(p => p.id !== id) : []);
    setRemovedId(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navbar navbar-expand-lg${!!isScroll ? 'navbar-dark bg-dark' : ''}`}>
          <div className="container">
            <a className="navbar-brand" href="/">
              <img className="logo"src={logo}/>
              {/* <span className="flaticon-pizza-1 mr-1"></span>Pizza <br /><small>Delicous</small> */}
            </a>
            <div className="text-primary ">Currency:
             <button type="button" className={`btn btn-link ${currency === '€' ? 'active' : ''}`} onClick={() => setCurrency('€')} >Euro</button>
             |<button type="button" className={`btn btn-link ${currency === '$' ? 'active' : ''}`} onClick={() => setCurrency('$')} >Dollar</button></div>
            {!!selectedPizza.length &&
              <CartModal cartList={selectedPizza} deliveryCost={deliveryCost} currency={currency} exchangeRate={exchangeRate} onSuccessfulOrder={(data) => onSuccessfulOrder(data)}
                resetCart={(id) => cartUpdate(id)}
                ApiHost={ApiHost} />
            }
          </div>
        </nav>
        <article className="banner">
          <h3>Happiness is pizza with lots of cheese</h3>
          <Button variant="danger" onClick={executeScroll} >Order Now</Button>{' '}
          <Button variant="warning ">Track Order</Button>
        </article>
      </header>

      <Service />
      <section className=" menu-container" ref={myRef} >
        <Menu
          addToCart={(pizzas) => cartList(pizzas)}
          currency={currency}
          exchangeRate={exchangeRate}
          removedId={removedId}
          ApiHost={ApiHost} />
      </section>

      {!!orderId && <Alert orderId={orderId}></Alert>}

      <article class="text-center">
        contact us
     </article>
    </div>
  );
}

export default App;
