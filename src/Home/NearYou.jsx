import React from 'react';
import styled from 'styled-components';

export const NearYou = () => {
  return (
  <div>
    <Heading>Near You</Heading>
  </div>
  )
}


/* Styled Components */

const Heading = styled.h2`
  background-color: blue;
  margin: 60px;
  font-weight: 700;
  font-family: 'Quicksand', sans-serif;
`