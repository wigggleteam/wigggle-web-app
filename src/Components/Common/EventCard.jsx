import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import styles from './event.module.less';

const toDisplayDate = (dateObj = new Date()) => {
  const dayJsInstance = dayjs(dateObj);
  const date = dayJsInstance.format('dddd, MMM D');
  const time = dayJsInstance.format('h:mm a');
  return `${date} | ${time}`;
};

export const EventCard = ({ event = {}, ...props }) => {
  const date = event.eventDate;
  const displayDate = toDisplayDate(date) || 'No Date';
  const imagesUrl = (event.imagesUrl && event.imagesUrl[0]) || 'https://via.placeholder.com/600x300';

  const ticketPrice = _.get(event, 'tickets.ticket1.price', '-');

  return (
    <div className={styles.card}>
      <Card {...props}>
        <Image src={imagesUrl} className={styles.coverImage} />
        <Card.Content>
          <Card.Description>
            <p className={styles.date}>{displayDate}</p>
          </Card.Description>
          <Card.Header>
            <p className={styles.title}>{ _.get(event, 'title', 'No Title')}</p>
            <span style={{ float: 'right' }}>
              Rs
              {' '}
              { ticketPrice }
            </span>
          </Card.Header>
          <Card.Meta>{ _.get(event, 'hosts.leader.name', 'Host Not Found') }</Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EventCard;
