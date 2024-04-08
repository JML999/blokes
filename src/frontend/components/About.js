import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import smallStan from './SmallStan.png'; // Adjust the path as necessary

const About = () => {
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
        <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem' }}>
            The 1st avatars on HYCHAIN.
        </p>
        <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem' }}>
            500 defaults built for HYTOPIA.
        </p>
        <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem' }}>
            Edits creator community launching soon. 
        </p>
      </Col>
    </Row>
  </Container>
  );
};

export default About;

/*


          <p>
            Hours after HYCHAIN went live, I came up with the idea for a collection of 500 default avatars as the first NFT collection on HYCHAIN. My reasoning was: 1) It was 3:30AM and I was high, my decision making was questionable, 2) I needed to mint quickly to be first and 3) I thought the idea of combining default characters like Steve from Minecraft with a scarce supply was a fun idea. After mint, I dropped the collection for free on discord and x. The collection was entirely claimed within 24hrs and, to date, we have over 200 holders.
          </p>
          <p>
            Going forward, we are focused on utility and community creation. We want to allow our holders to play with their default Stan (the one you first see on our homepage) easily and on as many worlds as possible. To that end, our team is exploring partnerships with worlds, as well as possibilities with HYTOPIA’s partnership program. This will allow each holder of the collection to play with a Stan verifiably on chain by just logging in to HYTOPIA.
          </p>
          <p>
            In addition, each Stan holder will have access to Skans: The Official Stan Skin Collection which can be downloaded by holders and playable in HYTOPIA as custom characters. This collection will be updated regularly by our community and our team. These won’t be on chain (at least at first), but we will be minting community favorites with proceeds going to creators.
          </p>
          <p>
            I've been making avatars for HYTOPIA and beyond for several years now. I have poured countless hours into collections, obsessing over details and the creative process. I created STANs on a whim in the middle of the night with zero thought and it’s quickly becoming my favorite project to date. Let’s see where we can take it.
          </p>
          <p className="mb-5">
            ✌🏻<br />
            -Justin (@gg_synk)
          </p>

*/

