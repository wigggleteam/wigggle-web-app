import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const Host = ({auth}) => {
  
  const router = useRouter();

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <h3>Welcome Host</h3>
            <Button onClick={()=> router.push('/host/event/')}>
              Post event
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Host;