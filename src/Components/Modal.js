import React, { useState, useEffect } from 'react';
import cart from './../Assets/Images/cart.png'
import upArrow from './../Assets/Images/up-arrow.png'
import downArrow from './../Assets/Images/down-arrow.png'
import { Modal, Button } from 'react-bootstrap';
import AddessForm from './Address';
import OrderDetails from './orderDetails';
import Cart from './Cart';
import axios from 'axios';

function CartModal(props) {
    const [lgShow, setLgShow] = useState(false);
    const [finalCart, setFinalCart] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);
    const [hideCart, setHideCart] = useState(false);
    const [address, setAddress] = useState({});

    const placeOrder = async () => {
        var arr2 = finalCart.slice()
        let cart = arr2.reduce((a, c) => ({ ...a, [c.id]: { 'quantity': c.quantity } }), {})
        const { data } = await axios.post('/api/order', {
            cart, address
        })
        props.onSuccessfulOrder(data)
        props.resetCart([]);
        setLgShow(false);
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
                        Order
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="light"
                        hidden={!isCheckout}
                        onClick={() => setHideCart(!hideCart)}
                    >{hideCart ? 'Show cart' : 'Hide cart'}
                        <img className="icon" src={hideCart ? downArrow : upArrow} />
                    </Button>
                    < div hidden={hideCart}>
                        <Cart
                            cartList={props.cartList}
                            deliveryCost={props.deliveryCost}
                            currency={props.currency}
                            exchangeRate={props.exchangeRate}
                            finalCart={(cart, total) => setFinalCart(cart) } 
                            cartModified={(id)=>props.resetCart(id)}/>
                    </div>

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
                    <Button variant="danger" hidden={!!isCheckout} onClick={() => { setIsCheckout(true); setHideCart(true) }}>
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