import React from 'react';
import { Grid, Input } from 'semantic-ui-react';

const Host = ({auth}) => {
  
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <h3>Become a host</h3>
            <p>What it is becoming a host with Wigggle ?</p>
            <p>- Enjoy interaction with people who are same minded</p>
            
            <Input icon='ticket' size="huge" iconPosition='left' placeholder='Place the token from the team' fluid />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Host;