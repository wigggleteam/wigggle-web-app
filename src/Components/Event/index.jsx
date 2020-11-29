import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import faker from 'faker';
import { Banner } from './Banner';
import { EventHeading } from './EventHeading';
import { EventTicket } from './EventTicket';
import { EventDetails } from './EventDetails';
import { Host } from './Host';
import { TC } from './TC';
import { Location } from './Location';
import { SimilarEvents } from './SimilarEvents';

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const avatar = faker.image.avatar();
    this.setState({ firstName, lastName, avatar });
  }

  render() {
    const { firstName, lastName, avatar } = this.state;
    return (
      <Container>
        <Banner />
        <EventHeading />
        <EventTicket />
        <EventDetails />

        <Host user={{ firstName, lastName, avatar }} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <TC />
            </Grid.Column>
            <Grid.Column width={6}>
              <Location />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SimilarEvents />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 80vw;
  margin: 50px auto;
`;
