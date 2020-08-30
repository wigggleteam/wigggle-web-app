import React from 'react';
import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react'

export const EventHeading = () => (
  <Grid>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Title>Paint and Paper Workshop</Title>
        <Languages>English | Hindi | Punjabi</Languages>
      </Grid.Column>
      <Grid.Column>
        <Share>
          <Icon name='share square outline' /> Share
        </Share>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Title = styled.h1`
  margin: 0;
`;

const Languages = styled.h4`
  font-weight: 600;
  font-size: 18px;
  margin: 10px 0;
`;

const Share = styled.div`
  font-size: 22px;
  font-weight: 600;
  float: right;
  margin-top: 10px;
`;

