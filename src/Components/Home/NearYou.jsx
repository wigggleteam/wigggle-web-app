import React, { useState } from 'react';
import styled from 'styled-components';

export const NearYou = () => {

  const [active, setActive] = useState(3);



  return (
    <>
      <div style={{ width: '100%' }}>
        <Heading>Near You</Heading>
        <ImagesGroup>
          <ImageSlice active={active === 1} onMouseOver={e => setActive(1)}>
            <Image src='\assets\travel.jpeg' />
          </ImageSlice>
          <ImageSlice active={active === 2} onMouseOver={e => setActive(2)}>
            <Image src='\assets\tech.jpg' />
          </ImageSlice>
          <ImageSlice active={active === 3} onMouseOver={e => setActive(3)}>
            <Image src='\assets\yoga.jpeg' />
          </ImageSlice>
          <ImageSlice active={active === 4} onMouseOver={e => setActive(4)}>
            <Image src='\assets\music.jpeg' />
          </ImageSlice>
          <ImageSlice active={active === 5} onMouseOver={e => setActive(5)}>
            <Image src='\assets\party.jpeg' />
          </ImageSlice>
        </ImagesGroup>
      </div>
      <div style={{ clear: 'both' }}></div>
    </>
  )
}


/* Styled Components */

const Heading = styled.h2`
  margin: 10px 60px;
  font-weight: 700;
  font-family: 'Quicksand', sans-serif;
`;

const ImagesGroup = styled.div`
  background-color: blue;
  margin: auto;
  width: 80vw;
  
`;

const ImageSlice = styled.div`
  width: ${ props => props.active ? '32vw' : '12vw'};
  overflow: hidden;
  float: left;
  height: 350px;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
`;

const Image = styled.img`
  width: 32vw;
  height: 400px; 

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover{
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    cursor: pointer;
  }
`;