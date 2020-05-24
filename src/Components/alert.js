import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
function AlertDismissible({orderId}) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Order Success !</Alert.Heading>
          <p>
         Your Order has been successfully placed.
         Please save referance id for order tracking.
         <h3> {orderId} </h3>
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  
  export default AlertDismissible;