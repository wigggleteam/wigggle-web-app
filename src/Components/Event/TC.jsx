import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const TC = ({ amenities }) => {
  const amenitiesDisplay = amenities.join(', ');
  return (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Title>Terms & Conditions</Title>
          <Details>
            <p>
              - Amenities:
              {' '}
              {' '}
              {amenitiesDisplay}
            </p>
            <p>
              - Age range of audience:
              {' '}
              {' '}
              18 to 30 years old
            </p>
            <p>
              - Strength of audience:
              {' '}
              {' '}
              16-30 guests
            </p>
          </Details>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const Title = styled.h1`
  margin: 0;
`;

const Details = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;
