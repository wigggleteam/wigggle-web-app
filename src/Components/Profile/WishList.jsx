import React from 'react';
import { Grid } from 'semantic-ui-react';

const WishList = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            No event in your wishlist
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default WishList;