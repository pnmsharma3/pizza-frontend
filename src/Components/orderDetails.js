import React from 'react';
const OrderDetails = ({address}) => {
    return ( 
        <>
                    <h3>Delivery Address</h3>
                    <hr />
                    <h5>{address.name}</h5>
                    <p>{address.phone}</p>
                    <p>{address.address}</p>
                    <div className="pt-1">
                        <h3>Payment</h3>
                        <hr />
                        <p> Net Banking</p>
                    </div>
                </>
     );
}
 
export default OrderDetails;