import React from 'react';
import styled from 'styled-components';
import { Grid, Icon, Image } from 'semantic-ui-react'

export const Host = ({user}) => {
  console.log(user);
  return(
  <Grid>
    <Grid.Row>
      <Grid.Column width={16}>
        <Title>Host</Title>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src={user.avatar} size='medium' circular />
      </Grid.Column>
      <Grid.Column width={13}>
        <Name>{ user ? `${user.firstName} ${user.lastName}` : '...'}</Name>
        <Info>Hosted - 1 event | Attended - 4 events</Info>
        <Bio>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Bio>
      </Grid.Column>
    </Grid.Row>
  </Grid>)
}

const Title = styled.h1`
  margin: 0;
`;

const Name = styled.h2`
  font-weight: 600;
  margin: 2px 0;
`;

const Info = styled.h4`
  font-weight: 600;
  color: #888;
  margin: 2px 0;
`;

const Bio = styled.p`
  font-size: 16px;
  color: #555;
  margin: 20px 0;
`;
