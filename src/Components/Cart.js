import React, { useState, useEffect } from 'react';
const Cart = (props) => {
    const [cartList, setCartList] = useState([]);
    useEffect(() => {
        setCartList(props.cartList);
    }, [props.cartList])
    
    const changeQuantity = (id, value) => {
        let list = cartList.map(selectedPizza => {
            if (selectedPizza.id === id) {
                selectedPizza.quantity = value
            }
            return selectedPizza;
        })
        setCartList(list);
    }

    const calculateTotal = () => {
        let total = cartList.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
        let formatedTotal=props.currency === '€' ? (total + props.deliveryCost).toFixed(2) : ((total + props.deliveryCost) * props.exchangeRate).toFixed(2) + props.currency;
        props.finalCart(cartList,formatedTotal)
        return (formatedTotal)
    }
    const removePizza=(id)=>{
        let modifiedCart=cartList.filter(p => p.id !==id);
        setCartList(modifiedCart)
         props.cartModified(id)

    }
    return (   <div className="table-responsive">
    <table className="table">
        <thead>
            <tr>
                <th scope="col">pizza</th>
                <th scope="col" >Quantity</th>
                <th scope="col" >Price</th>
                <th scope="col" ></th>
            </tr>
        </thead>
        <tbody>
            {cartList.map((pizza, index) => (
                <tr key={index}>
                    <td> <div> <h4>{pizza.title}</h4>
                        <p>{pizza.description} </p></div></td>
                    <td><input type="number" min="1" value={pizza.quantity} onChange={(event) => changeQuantity(pizza.id, event.target.value)}
                    /></td>
                    <td>
                        {props.currency === '€' ? pizza.price : (pizza.price * props.exchangeRate).toFixed(2)} {props.currency}</td>
                    <td>
                        <button type="button" className="btn btn-light" onClick={() => removePizza(pizza.id) }>remove</button>
                    </td>
                </tr>
            ))
            }
            <tr >
                <td colSpan="2"> Delivery Cost</td>
                <td>{props.currency === '€' ? props.deliveryCost : (props.deliveryCost * props.exchangeRate).toFixed(2)} {props.currency}
                </td>
                <td></td>
            </tr>
            <tr >
                <td colSpan="2"> Total</td>
                <td>{calculateTotal()}
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</div> );
}
 
export default Cart;