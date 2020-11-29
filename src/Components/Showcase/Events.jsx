import React from 'react';
import _ from 'lodash';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import { EventCard } from '../Common/EventCard';

export const Events = ({ events = [] }) => {
  if (!events.length || events.length === 0) {
    return (
      <Grid columns={3} stackable>
        {
          _.map([1, 2, 3, 4, 5, 6], () => (
            <Grid.Column>
              <div style={{ paddingTop: '50px' }}>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </div>
            </Grid.Column>
          ))
        }
      </Grid>
    );
  }

  return (
    <Grid columns={4}>
      <Grid.Row>
        {_.map(events, (event) => {
          console.log(event);
          return (
            <Grid.Column key={event.id}>
              <div style={{ margin: '10px 0' }}>
                <Link href="/event">
                  <EventCard key={event.id} event={event} />
                </Link>
              </div>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  );
};
