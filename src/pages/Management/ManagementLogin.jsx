import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';
const ManagementLogin = () => {

    return (

        <Alert variant="primary">
            <InputGroup className="mb-3">
                <InputGroup.Text  id="basic-addon1">ID</InputGroup.Text>
                <Form.Control
                    placeholder="ID"
                    aria-label="ID"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
                <Form.Control
                    placeholder="PW"
                    aria-label="PW"
                />
            </InputGroup>
            <hr />
            <Button variant="outline-primary">LOGIN</Button>
        </Alert>
    );
}

export default ManagementLogin;