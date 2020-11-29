import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const EventDetails = ({ description }) => (
  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column>
        <Title>Details</Title>
        <Details>
          {description}
        </Details>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const Title = styled.h1`
  margin: 0;
`;

const Details = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;
