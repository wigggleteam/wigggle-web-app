import React from 'react';
import styled from 'styled-components';
import { Card, Icon, Image } from 'semantic-ui-react'

export const EventCard = ({event, ...props}) => {
  return(
  <div style={{cursor: 'pointer'}}>
    <Card {...props}>
      <Image src={event && event.image} wrapped height='400px' />
      <Card.Content>
        <Card.Description>
          <Date>23 Aug | 7 pm</Date>
        </Card.Description>
        <Card.Header>{event && event.title} <span style={{float: 'right'}}>Rs 150</span></Card.Header>
        <Card.Meta>{event && event.host}</Card.Meta>
      </Card.Content>
    </Card>
  </div>
  )
}

export default EventCard

const Date = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #F34949;
  padding-bottom: 10px;
`