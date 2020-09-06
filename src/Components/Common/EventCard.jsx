import React from 'react';
import styled from 'styled-components';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import faker from 'faker';
import _ from 'lodash';

const toDisplayDate = (dateObj = new Date()) => {
  const date = moment(dateObj).format("dddd, MMM Do");
  const time = moment(dateObj).format('LT');
  return `${date} | ${time}`;
};

export const EventCard = ({event = {}, ...props}) => {

  const dates = event.eventDates || [];
  const displayDate = toDisplayDate(dates[0]) || 'No Date';

  return(
  <div style={{cursor: 'pointer'}}>
    <Card {...props}>
      <Image src={event && event.image || faker.image.fashion()  } wrapped height='400px' />
      <Card.Content>
        <Card.Description>
          <DateDisplay>{displayDate}</DateDisplay>
        </Card.Description>
        <Card.Header>{ _.get(event, 'title', 'No Title')} 
          <span style={{float: 'right'}}>Rs { _.get(event, 'ticket.basic', '-')}</span>
        </Card.Header>
        <Card.Meta>{ _.get(event, 'hosts.leader.name', 'Host Not Found') }</Card.Meta>
      </Card.Content>
    </Card>
  </div>
  )
}

export default EventCard

const DateDisplay = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #F34949;
  padding-bottom: 10px;
`