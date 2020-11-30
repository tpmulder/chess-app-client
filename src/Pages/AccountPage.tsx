import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Row, Col } from 'react-bootstrap';

const AccountPage = () => {
    const { isAuthenticated } = useAuth0();

    return ( 
        <Row className='justify-content-center'>
            <Col xs={10} className='border shadow mt-5'>
                <Row>
                    <Col xs={12} className='text-center title'>
                        <h1>Account</h1>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AccountPage;