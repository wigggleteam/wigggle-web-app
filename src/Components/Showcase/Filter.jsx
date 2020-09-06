import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Container, Checkbox, Rating } from 'semantic-ui-react';
import { categories } from '../../constants/categories';


export const Filter = () => {

  return (
  <Container>
    <h4>Categories</h4>
     { _.map(categories, (category) => {
        return <Box><Checkbox label={{ children: category.label }} /></Box>
     })}
    <h4>Day</h4>
      <Box><Checkbox label={{ children: 'Today' }} /></Box>
      <Box><Checkbox label={{ children: 'This week' }} /></Box>
      <Box><Checkbox label={{ children: 'This weekend' }} /></Box>
      <Box><Checkbox label={{ children: 'This month' }} /></Box>
    <h4>Location</h4>
      <Box><Checkbox label={{ children: 'HSR' }} /></Box>
      <Box><Checkbox label={{ children: 'Koramangla' }} /></Box>
      <Box><Checkbox label={{ children: 'WhiteField' }} /></Box>
      <Box><Checkbox label={{ children: 'Online' }} /></Box>
    <h4>Price</h4>
      <input
        type='range'
        min={0}
        max={5000}
        value={10}
        onChange={()=>{}}
      />
  </Container>
  )
}

const Box = styled.div`
  margin: 5px 0px;
`;
