import React from 'react';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import { EventCard } from '../Common/EventCard';
import faker from 'faker';

const host = `${faker.name.firstName()} ${faker.name.lastName()}`;
const title = 'Yoga on the beach'


export const Events = (events = []) => {
  return (
    <Grid columns={3}>
      <Grid.Row>
        {_.map([1,2,3,4,5,6,7,8], () => {
          return (
            <Grid.Column>
              <div style={{margin: '10px 0'}}>
                <EventCard event={{ image: faker.image.fashion(), host, title }} />
              </div>
            </Grid.Column>
          )
        })}
      </Grid.Row>
    </Grid>
  )
}