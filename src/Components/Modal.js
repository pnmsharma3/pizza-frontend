import React, { useState, useEffect } from 'react';
import cart from './../Assets/Images/cart.png'
import { Modal } from 'react-bootstrap';
function CartModal(props) {
    const [lgShow, setLgShow] = useState(false);
    const [cartList, setCartList] = useState([]);
    useEffect(() => {
        setCartList(props.cartList);
    }, [props.cartList])
    const changeQuantity = (id, value) => {
       let list= cartList.map(selectedPizza => {
            if (selectedPizza.id === id) {
                selectedPizza.quantity = value
            }
            return selectedPizza;
        })
        setCartList(list);

    }
    return (
        <>
            <div className="btn" onClick={() => setLgShow(true)}>
                <img className="cart-icon" src={cart}></img>
                <span className='badge badge-warning cart-count'> {props.cartList.length} </span>
            </div>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Cart Items
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
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
                                        <td><input type="number" min="1" value={pizza.quantity} onChange={(event) =>changeQuantity(pizza.id,event.target.value)}
                                        /></td>
                                        <td>{pizza.price}</td>
                                        <td>
                                            <button type="button" className="btn btn-light" onClick={()=> setCartList(cartList.filter(p=>p.id!==pizza.id))}>remove</button>
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default CartModal;