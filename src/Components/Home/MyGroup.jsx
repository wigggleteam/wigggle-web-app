import React from 'react';
import styled from 'styled-components';

export const MyGroup = () => {
  return (
    <Groups>
      <Heading>Jai has Veeru, yash has sakshi... You have?</Heading>
      <Subheading>We help you finding your troop, your squad with whom you can wigggle around having loads of fun!</Subheading>
      <Button>Find My Group</Button>
    </Groups>
  )
}

/* Styled Components */

const Groups = styled.div`
  width: 80vw;
  margin: 30px auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 40px;
  color: #111;
`;

const Subheading = styled.h3`
  width: 40vw;
  margin: 0 auto;
  font-size: 16px;
  color: #666;
`;

const Button = styled.button`
  background-image: linear-gradient(to right, #EA573E , #EA3E7E);
  color: #fff;
  width: 300px;
  font-size: 20px;
  padding: 15px 20px;
  font-weight: 600;
  border: 1px hidden;
  border-radius: 20px !important;
  opacity: 1;
  margin: 35px 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`