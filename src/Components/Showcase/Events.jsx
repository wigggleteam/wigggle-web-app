import React from 'react';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import { EventCard } from '../Common/EventCard';

export const Events = ({events = []}) => {
  return (
    <Grid columns={3}>
      <Grid.Row>
        {_.map(events, (event) => {
          console.log(event)
          return (
            <Grid.Column key={event.id}>
              <div style={{margin: '10px 0'}}>
                <EventCard key={event.id} event={event} />
              </div>
            </Grid.Column>
          )
        })}
      </Grid.Row>
    </Grid>
  )
}