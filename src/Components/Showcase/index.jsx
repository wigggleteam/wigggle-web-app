import React, {Component} from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { Filter } from './Filter';
import { Events } from './Events';
import { getEventsFromFireStore } from '../../firebase/firestoreServices';

export default class extends Component{

  constructor(props) {
    super(props);
    this.state = {}
  }

  unsubscribe = undefined;

  componentDidMount(){
    this.unsubscribe = getEventsFromFireStore({
      next: (snapshot) => { snapshot.docs.map(docSnapshot => console.log(docSnapshot.data())) },
      error: console.log
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){

    return(
      <Container>
        <h5>Home/ Events/ Yoga Events</h5>
        <h3>Health and Wellness - <span>12 Events</span></h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <h5>Filters</h5>
              <h5>Clear All</h5>
              <Filter />
            </Grid.Column>
            <Grid.Column width={12}>
              <p><Subheading active={true}>All</Subheading> <Subheading>Food</Subheading> <Subheading>Personality Building</Subheading> <Subheading>Physical Wellness</Subheading> <Subheading>Mental Health</Subheading> </p>
              <Events />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }


}

const Container = styled.div`
  width: 90vw;
  margin: 50px auto;
`;

const Subheading = styled.span`
  border-bottom: ${(props) => props.active ? '4px solid #F24B54' : 'none'};
  font-size: 16px;
  font-weight: 800;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
`