import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = (props) => {
    const [pizzaList, setPizzaList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios('/api/pizza-list');
            setPizzaList(data);
        }
        fetchData();
    }, []);
    const setSelectedpizza=(pizza)=>{
        setSelectedList([...selectedList,pizza]);
        props.addToCart([...selectedList,pizza]);
    }

    return (
        <section className=" menu-container">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-3">
                    <div className="col-md-7 heading-section ftco-animate text-center">
                        <h2 className="mb-4">Hot Pizza Meals</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                </div>

                <div className="container-wrap">
                    <div className="row ">
                        {pizzaList.map((pizza,index) => (
                            <div className="col-lg-4 p-2" key={index} >
                                <div className="card" >
                                    <img className="card-img-top" src={pizza.img_url} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{pizza.title}</h5>
                                        <p className="card-text">
                                            {pizza.description}
                                        </p>
                                        <div className="card-links">
                                            <span className="price-tag">$ {pizza.price} </span>
                                            <button className="btn btn-danger float-right" onClick={()=>setSelectedpizza(pizza)}>Add to cart</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Menu;