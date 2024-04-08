import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './fonts.css'; // Assuming this contains the Minecraftia font-face definition
import smallStan from './SmallStan.png'; // Adjust the path as necessary

const Navigation = ({ web3Handler, account }) => {
    // State to manage if the viewport is considered mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect hook to manage changes in viewport size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Navbar bg="white" variant="light" expand="lg"> {/* Ensure Navbar is responsive */}
            <Container>
                <Link to="/" className="navbar-brand">
                    <img
                        src={smallStan}
                        width={isMobile ? "25" : "30"} // Adjust the size based on isMobile
                        height={isMobile ? "30" : "35"} // Adjust the size based on isMobile
                        className="d-inline-block align-top"
                        alt="Small Stan"
                        style={{ marginRight: isMobile ? '10px' : '15px' }} // Adjust spacing based on isMobile
                    />
                    <span style={{ fontFamily: 'Minecraftia', color: 'black' }}>
                        &nbsp;stans
                    </span>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{ fontFamily: 'Minecraftia' }}>
                        <Nav.Link as={Link} to="/Home" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: isMobile ? '12px' : '14px' }}>skins</Nav.Link>
                        <Nav.Link as={Link} to="/About" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: isMobile ? '12px' : '14px' }}>about</Nav.Link>
                        <Nav.Link as={Link} to="/Socials" style={{ fontFamily: 'Minecraftia', color: '#808080', fontSize: isMobile ? '12px' : '14px' }}>social</Nav.Link>
                    </Nav>
                    <Nav style={{ fontFamily: 'Minecraftia' }}>
                        {account ? (
                            <Link to="/Dashboard" className="button nav-button btn-sm mx-4">
                                <Button variant="outline-dark" className="custom-button" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
                                    {"Dashboard"}
                                </Button>
                            </Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-dark" className="custom-button" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
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