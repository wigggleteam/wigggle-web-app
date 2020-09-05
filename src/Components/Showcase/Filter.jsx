import React from 'react';
import _ from 'lodash';
import { Container, Checkbox, Rating } from 'semantic-ui-react';
import { categories } from '../../constants/categories';


export const Filter = () => {

  return (
  <Container>
    <h4>Categories</h4>
     { _.map(categories, (category) => {
        return <p><Checkbox label={{ children: category.label }} /></p>
     })}
    <h4>Day</h4>
      <p><Checkbox label={{ children: 'Today' }} /></p>
      <p><Checkbox label={{ children: 'This week' }} /></p>
      <p><Checkbox label={{ children: 'This weekend' }} /></p>
      <p><Checkbox label={{ children: 'This month' }} /></p>
    <h4>Location</h4>
      <p><Checkbox label={{ children: 'HSR' }} /></p>
      <p><Checkbox label={{ children: 'Koramangla' }} /></p>
      <p><Checkbox label={{ children: 'WhiteField' }} /></p>
      <p><Checkbox label={{ children: 'Online' }} /></p>
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