import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './fonts.css'; // Assuming this contains the Minecraftia font-face definition
import smallStan from './SmallStan.png'; // Adjust the path as necessary

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar bg="white" variant="light">
            <Container>
                <Link to="/" className="navbar-brand">
                    <img
                        src={smallStan}
                        width="30" // Adjust the size as needed
                        height="35" // Adjust the size as needed
                        className="d-inline-block align-top"
                        alt="Small Stan"
                        style={{ marginRight: '15px' }} // Adds space between the icon and the text
                    />
                    <span style={{ fontFamily: 'Minecraftia', color: 'black' }}>
                        &nbsp;stans
                    </span>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{ fontFamily: 'Minecraftia' }}>
                        <Nav.Link as={Link} to="/Home" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: '14px' }}>skins</Nav.Link>
                        <Nav.Link as={Link} to="/About" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: '14px' }}>about</Nav.Link>
                        <Nav.Link as={Link} to="/Socials" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: '14px' }}>social</Nav.Link>
                    </Nav>
                    <Nav style={{ fontFamily: 'Minecraftia' }}>
                        {account ? (
                            <Link to="/Dashboard" className="button nav-button btn-sm mx-4">
                                <Button variant="outline-dark" className="custom-button">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>
                            </Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-dark" className="custom-button">
                                Connect Wallet
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;




/*
<img src={market} width="40" height="40" className="" alt="" />
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">List</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>


*/