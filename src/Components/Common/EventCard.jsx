import React from 'react';
import styled from 'styled-components';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import faker from 'faker';
import _ from 'lodash';
import styles from './event.module.less';

const toDisplayDate = (dateObj = new Date()) => {
  const date = moment(dateObj).format("dddd, MMM Do");
  const time = moment(dateObj).format('LT');
  return `${date} | ${time}`;
};

export const EventCard = ({event = {}, ...props}) => {

  const dates = event.eventDates || [];
  const displayDate = toDisplayDate(dates[0]) || 'No Date';
  const imagesUrl = event.imagesUrl && event.imagesUrl[0] || "https://via.placeholder.com/600x300" ;

  return(
  <div className={styles.card}>
    <Card {...props}>
      <Image src={imagesUrl} wrapped height='100px' />
      <Card.Content>
        <Card.Description>
          <p className={styles.date}>{displayDate}</p>
        </Card.Description>
        <Card.Header>
          <p className={styles.title}>{ _.get(event, 'title', 'No Title')}</p>
          <span style={{float: 'right'}}>Rs { _.get(event, 'ticket.basic', '-')}</span>
        </Card.Header>
        <Card.Meta>{ _.get(event, 'hosts.leader.name', 'Host Not Found') }</Card.Meta>
      </Card.Content>
    </Card>
  </div>
  )
}

export default EventCard;
