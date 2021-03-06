import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = (props) => {
    const [pizzaList, setPizzaList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios(`${props.ApiHost}api/pizza-list`);
            setPizzaList(data || []);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let newList = props.removedId === 'all' ? [] : selectedList.filter(p => p.id !== props.removedId);
        setSelectedList(newList);
    }, [props.removedId])

    const setSelectedpizza = (pizza) => {
        setSelectedList([...selectedList, pizza]);
        props.addToCart([...selectedList, pizza]);
    }
    return (
        <div className="container">
            <div className="row justify-content-center mb-5 pb-3">
                <div className="col-md-7 heading-section ftco-animate text-center">
                    <h2 className="mb-4">Hot Pizza Meals</h2>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
            </div>
            {!!pizzaList && !!pizzaList.length && typeof pizzaList === 'object' ?
                <div className="container-wrap">
                    <div className="row ">
                        {pizzaList.map((pizza, index) => (
                            <div className="col-lg-4 p-2" key={index} >
                                <div className="card" >
                                    <img className="card-img-top" src={pizza.img_url} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{pizza.title}</h5>
                                        <p className="card-text">
                                            {pizza.description}
                                        </p>
                                        <div className="card-links">
                                            <span className="price-tag">{props.currency === '€' ? pizza.price : (pizza.price * props.exchangeRate).toFixed(2)} {props.currency}</span>
                                            <button className="btn btn-danger float-right" disabled={selectedList.includes(pizza)} onClick={() => setSelectedpizza(pizza)}>
                                                {selectedList.includes(pizza) ? 'Added' : 'Add to cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                : ''} </div>

    );
}

export default Menu;