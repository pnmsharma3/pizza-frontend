import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
function AddressForm(props) {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
       
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            setValidated(true);
            let newAddress={
                name,
                phone,
                address
            } 
            props.setAddress(newAddress);
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        defaultValue={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Enter a name.
              </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="number"
                            defaultValue={phone}
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={(e)=>setPhone(e.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a phone Number.
              </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <InputGroup>
                    <Form.Control type="text"
                        required
                        defaultValue={address} 
                        onChange={(e)=>setAddress(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a address.
              </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Button type="submit" >Save</Button>
        </Form>
    );
}

export default AddressForm;