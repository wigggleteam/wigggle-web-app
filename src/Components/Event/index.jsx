import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Icon, Grid, Header, Loader,
} from 'semantic-ui-react';
import { Banner } from './Banner';
import { EventHeading } from './EventHeading';
import { EventTicket } from './EventTicket';
import { EventDetails } from './EventDetails';
import { Host } from './Host';
import { TC } from './TC';
import { Location } from './Location';
import { SimilarEvents } from './SimilarEvents';
import { fetchEventFromId } from '../../firebase/firestore/events';
import styles from './event.module.less';

const Event = (props) => {
  const [eventInfo, setEventInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { eid } = props;

  useEffect(() => {
    fetchEventFromId(eid).then((eventData) => {
      setLoading(false);
      if (_.isEmpty(eventData)) {
        setError('The event URL is wrong. Redirecting to Home.');
        setTimeout(() => { window.location.pathname = '/'; }, 3000);
        return;
      }
      setEventInfo(eventData);
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader active inline="centered">
          Fetching something awesome...
        </Loader>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Header as="h3" textAlign="center">
          <Icon name="plug" />
          {error}
        </Header>
      </div>
    );
  }

  console.log(eventInfo);
  const shareUrl = window.location.href;
  const {
    title, tags, description, hosts, imagesUrl, tickets, eventDate } = eventInfo;

  if (_.isEmpty(eventInfo)) {
    return 'something went wrong';
  }

  return (
    <div className={styles.container}>
      <Banner imagesUrl={imagesUrl} />
      <EventHeading title={title} tags={tags} shareUrl={shareUrl} />
      <EventTicket eventDate={eventDate} tickets={tickets} />
      <EventDetails description={description} />

      <Host hosts={hosts} />
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
    </div>
  );
};

export default Event;
