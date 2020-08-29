import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react'

export const Events = () => {

  return (
    <>
      <ShowCase>
        <Tabs>
          <TabList>
            <Tab>Free</Tab>
            <Tab>Tomorrow</Tab>
            <Tab>Today</Tab>
            <Tab>This Weekend</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EventSlider title='Free' />
            </TabPanel>
            <TabPanel>
              <EventSlider title='Tomorrow' />
            </TabPanel>
            <TabPanel>
              <EventSlider title='Today' />
            </TabPanel>
            <TabPanel>
              <EventSlider title='This Weekend' />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ShowCase>
      <div style={{ clear: 'both' }} ></div>
    </>)
}


const EventSlider = ({ title }) => {
  return (
    <EventContainer>
      <Title>Events - {title}</Title>
      <Event>
        <EventImage src='/assets/party.jpeg' />
        <EventName>The eyes chico they never lie</EventName>
        <Category>House Party</Category>
        <Info>Meghna Sahni | 20th Aug | 5:00pm</Info>
        <div style={{ width: '40%', float: 'right', textAlign: 'center', padding: '40px 0' }} >
          <Book basic>Attend Now</Book>
        </div>
        <EventsList>
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
          <Item src='https://via.placeholder.com/150' height='50' />
        </EventsList>
      </Event>
    </EventContainer>
  )
}

/* Compound Component */

class TabList extends React.Component {
  render() {
    const { activeIndex, changeActiveIndex } = this.props;
    const children = this.props.children;
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        activateMe: () => changeActiveIndex(index)
      })
    })
  }
}

class TabPanels extends React.Component {
  render() {
    const { activeIndex } = this.props;
    return (
      <div style={{ clear: 'both' }}>
        {this.props.children[activeIndex]}
      </div>
    )
  }
}

class TabPanel extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  handleActiveIndex = (index) => {
    this.setState({ activeIndex: index });
  }

  render() {

    const children = React.Children.map(this.props.children, (child) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex
        })
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          changeActiveIndex: this.handleActiveIndex
        })
      } else {
        return child;
      }
    })
    return <div>{children}</div>
  }
}

class Tab extends React.Component {

  render() {
    const { isActive, activateMe } = this.props;
    return (
      <div style={{ float: 'left' }} onClick={activateMe}>
        <TabView>{this.props.children}</TabView>
        <Active isActive={isActive}></Active>
      </div>
    )
  }
}

/* Styled Components */

const ShowCase = styled.div`
 width: 80vw;
 margin: 20px auto;
`;

const TabView = styled.div`
  font-weight: 600;
  font-size: 22px;
  width: 12vw;
  text-align: center;
  padding: 15px 0;
  margin: 0 4vw;
  cursor: pointer;
`;

const Active = styled.div`
  display: ${ props => props.isActive ? 'block' : 'none'};
  width: 12vw;
  height: 10px;
  margin: 0 4vw;
  background-color: #F24B55;
  border: 1px solid #F24B55;
  border-radius: 5px; 
`;

const EventContainer = styled.div`
  padding: 50px 0;
  height: 650px;
`

const Title = styled.h4`
  font-weight: 500px;
  font-size: 27px;
  margin: 40px 0;
`;

const Event = styled.div`

`;

const EventImage = styled.img`
  float: left;
  width: 55%;
  height: 400px;
  margin-left: 5%;
`;

const EventName = styled.p`
  font-weight: 600;
  width: 40%;
  float: right;
  font-size: 32px;
  padding: 5px 20px;
  margin:0;
  text-align: center;
`;

const Category = styled.p`
  font-weight: 600;
  width: 40%;
  float: right;
  font-size: 22px;
  padding: 5px 20px;
  margin:0;
  text-align: center;

  &:before {
    content: '●';
    margin: 5px;
  }
  &:after {
    content: '●';
    margin: 5px;
  }
`;

const Info = styled.p`
  font-weight: 600;
  width: 40%;
  float: right;
  font-size: 18px;
  padding: 5px 20px;
  margin:0;
  text-align: center;
`;

const EventsList = styled.div`
  clear: both;
  margin-left: 5%;
  padding-top: 20px;
`;

const Item = styled.img`
  margin-right: 15px;
`;

const Book = styled(Button)`
  margin: 10px auto;
  width: 200px;
  font-weight: 600 !important;
  font-size: 18px !important;
`