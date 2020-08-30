import React from 'react';
import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react'

export const EventDetails = () => (
  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column>
        <Title>Details</Title>
        <Details>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Details>
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

