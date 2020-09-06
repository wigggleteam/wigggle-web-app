import React from 'react';
import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react';
import { EventCard } from '../Common/EventCard';
import faker from 'faker';

export const SimilarEvents = () => {

  const host = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const title = 'Yoga on the beach'

  return (
    <div style={{marginTop: '30px'}}>
      <Title>Similar Events</Title>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <EventCard />
          </Grid.Column>
          <Grid.Column>
            <EventCard />
          </Grid.Column>
          <Grid.Column>
            <EventCard/>
          </Grid.Column>
          <Grid.Column>
            <EventCard/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const Title = styled.h1`
  margin: 10px 0;
`;

const Details = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

