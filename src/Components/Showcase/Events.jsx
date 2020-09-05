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
            <Grid.Column>
              <div style={{margin: '10px 0'}}>
                <EventCard event={event} />
              </div>
            </Grid.Column>
          )
        })}
      </Grid.Row>
    </Grid>
  )
}