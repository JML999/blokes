import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import smallStan from './SmallStan.png'; // Adjust the path as necessary

const About = () => {
  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={6} className="text-center">
        <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem' }}>
           ny-skins   
        </p>

      </Col>
    </Row>
  </Container>
  );
};

export default About;


