import React from 'react';
import { Grid } from 'semantic-ui-react';

const UpcomingEvents = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            No upcoming Events for you...
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default UpcomingEvents;