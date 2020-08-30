import React from 'react';
import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react'

export const TC = () => (
  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column>
        <Title>Terms & Conditions</Title>
        <Details>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
          <p>- This is a term and condition of this event</p>
        </Details>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Title = styled.h1`
  margin: 0;
`;

const Details = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

