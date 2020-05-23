import React, { useState, useEffect } from 'react';
import cart from './../Assets/Images/cart.png'
import { Modal, Button } from 'react-bootstrap';
import AddessForm from './Address';
import OrderDetails from './orderDetails';
import Cart from './Cart';
function CartModal(props) {
    const [lgShow, setLgShow] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);
    const [address, setAddress] = useState({});
    useEffect(() => {
        setCartList(props.cartList);
    }, [props.cartList])
    // const changeQuantity = (id, value) => {
    //     let list = cartList.map(selectedPizza => {
    //         if (selectedPizza.id === id) {
    //             selectedPizza.quantity = value
    //         }
    //         return selectedPizza;
    //     })
    //     setCartList(list);

    // }
    // const calculateTotal = () => {
    //     let total = cartList.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
    //     return (props.currency === '€' ? total + props.deliveryCost : ((total + props.deliveryCost) * props.exchangeRate).toFixed(2) + props.currency
    //     )
    // }
    const placeOrder = () => {
        console.log('ready to place order')
    }

    return (
        <>
            <div className="btn" onClick={() => setLgShow(true)}>
                <img className="cart-icon" src={cart}></img>
                <span className='badge badge-warning cart-count'> {props.cartList.length} </span>
            </div>
            <Modal
                show={lgShow}
                onHide={() => setLgShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Cart Items
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Cart cartList={props.cartList} deliveryCost={props.deliveryCost} currency={props.currency} exchangeRate={props.exchangeRate}/>
                    {/* <div className="table-responsive">
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
                                            <button type="button" className="btn btn-light" onClick={() => setCartList(cartList.filter(p => p.id !== pizza.id))}>remove</button>
                                        </td>
                                    </tr>
                                ))
                                }
                                <tr >
                                    <td colSpan="2"> Delivery Cost</td>
                                    <td>{props.currency === '€' ? props.deliveryCost : (props.deliveryCost * props.exchangeRate).toFixed(2)} {props.currency}
                                    </td>
                                </tr>
                                <tr >
                                    <td colSpan="2"> Total</td>
                                    <td>{calculateTotal()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                    <div hidden={!isCheckout || !!Object.keys(address).length}>
                        <hr />
                        <h3>Add Delivery Address</h3>
                        <AddessForm setAddress={(address) => setAddress(address)} />
                    </div>
                    <div hidden={!isCheckout || !!!Object.keys(address).length}>
                        <OrderDetails address={address} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" hidden={!!isCheckout} onClick={() => setIsCheckout(true)}>
                        Checkout
                    </Button>
                    <Button variant="danger" hidden={!isCheckout || !!!Object.keys(address).length} onClick={() => placeOrder()}>
                        Confirm Order
          </Button>
                </Modal.Footer>
            </Modal>



        </>
    );
}

export default CartModal;