import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import smallStan from './SmallStan.png'; // Adjust the path as necessary

const Socials = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
        <img
            src={smallStan}
            width="90" // Adjust the size as needed
            height="120" // Adjust the size as needed
            className="d-inline-block align-top"
            alt="Small Stan"
            style={{ marginRight: '0px' }} // Adds space between the icon and the text
          />
         {/* <h2 style={{ fontFamily: 'Minecraftia' }}>Connect With Us</h2> */} 
          {/* Twitter Button */}
          <Button 
            variant="dark" 
            href="https://twitter.com/stansofhytopia" 
            target="_blank"
            className="mt-3 d-block mx-auto"
            style={{ fontFamily: 'Minecraftia' }}
          >
            X
          </Button>
          {/* Hychain Explorer Button */}
          <Button 
            variant="dark" 
            href="https://explorer.hychain.com/token/0xEb6F6c95C1A31C97e61a0f18CFB02c544DFE7436" 
            target="_blank"
            className="mt-3 d-block mx-auto"
            style={{ fontFamily: 'Minecraftia' }}
          >
            Hychain Explorer
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Socials;
