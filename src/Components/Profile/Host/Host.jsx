import React from 'react';
import { Grid, Input } from 'semantic-ui-react';
import Link from 'next/link';

const Host = ({auth}) => {
  
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <h3>Welcome Host</h3>
            <Link href="/host/event">
              Post event
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Host;