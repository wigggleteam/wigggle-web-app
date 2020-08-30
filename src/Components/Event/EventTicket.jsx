import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Icon } from 'semantic-ui-react';

export const EventTicket = () => {
  return(
    <TicketContainer>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Date>
              <span style={{fontSize:'36px', fontWeight:'bold'}}>27</span>June'20
              <br />
              <p style={{fontSize:'20px', color:'#666', marginTop:'5px'}}>Tuesday</p>
            </Date>
          </Grid.Column>
          <Grid.Column>
            <Location>
              <Icon name='map marker alternate' /> Kormangala
            </Location>
            <Attending>
              <Icon name='group' /> 80+ booked
            </Attending>
          </Grid.Column>
          <Grid.Column>
            <Price>
              <span style={{fontSize: '36px', fontWeight: '600'}}>Rs. 350</span> per ticket
              <br />
              <p style={{fontSize: '24px', fontWeight: '600', marginTop: '10px', color: '#F24B54'}}>Book Now ?</p>
            </Price>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </TicketContainer>
  )
}

const TicketContainer = styled.div`
  margin: 60px 0;
`;

const Location = styled.div`
  font-size: 32px;
  text-align: center;
  margin: 10px 0;
`;

const Attending = styled.div`
  font-size: 26px;
  text-align: center;
  margin: 15px 0;
`;

const Date = styled.div`
  font-size: 26px;
  text-align: left;
  margin: 15px 0;
`;

const Price = styled.div`
  font-size: 26px;
  text-align: right;
  margin: 15px 0;
`;