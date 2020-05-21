import React from 'react';

import './Assets/Style/style.scss';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Service from './Components/Service'
const cartList=(pizzas)=>{
  console.log('pizzaspizzaspizzaspizzas',pizzas)
}
function App() {
  return (
    <div className="App">
      <Header/>
      <Service/>
      <Menu addToCart={(pizzas)=>cartList(pizzas)}/>
     <article >
          contact us
        </article>
    </div>
  );
}

export default App;
