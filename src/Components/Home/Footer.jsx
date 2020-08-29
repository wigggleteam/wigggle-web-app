import React from 'react';
import { Grid, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

export const Footer = () => {
  return (
    <Background>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Logo src='/assets/logo.png' /> <Name>Wigggle</Name>
            <Info>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Info>
            <SRT>Terms and Conditions</SRT>
            <SRT>Privacy Policy</SRT>
            <SRT>Contact Us</SRT>
            <SRT>About Us</SRT>
          </Grid.Column>
          <Grid.Column>
            <Round><Icon name='facebook f' size='large' /></Round>
            <Round><Icon name='instagram' size='large' /></Round>
            <Round><Icon name='twitter' size='large' /></Round>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Background>
  )
}

const Background = styled.div`
  background-color: #000;
  min-height: 400px;
  color: #fff;
  padding: 50px;
`;

const Logo = styled.img`
  height: 40px;
`;

const Name = styled.span`
  font-size: 18px;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 35px 5px;
`;

const SRT = styled.h3`
  maring: 5px;
`;

const Round = styled.div`
  float: left;
  padding: 15px;
  border: 1px solid #fff;
  width: 55px;
  border-radius: 25px;
  margin: 0 15px;
`
