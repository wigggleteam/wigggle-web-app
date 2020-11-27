import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { Filter } from './Filter';
import { Events } from './Events';
import { getEventsFromFireStore } from '../../firebase/firestore/firestoreServices';
import { fetchDataFromEventSnapshot } from '../../firebase/utils';
import { setEvents } from '../../model/showcase/actions';

class ShowCase extends Component{

  constructor(props) {
    super(props);
    this.state = {}
  }

  unsubscribe = undefined;

  componentDidMount(){
    this.unsubscribe = getEventsFromFireStore({
      next: (snapshot) => this.props.setEvents(snapshot.docs.map(fetchDataFromEventSnapshot)), 
      error: console.log
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const { showcase } = this.props;

    return(
      <Container key="showcase-container">
        <h5>Home/ Events/ Yoga Events</h5>
        <h3>Health and Wellness - <span>12 Events</span></h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <h5>Filters</h5>
              <h5>Clear All</h5>
              <Filter />
            </Grid.Column>
            <Grid.Column width={13}>
              <p>
                <Subheading active={true}>All</Subheading> 
                <Subheading>Food</Subheading> 
                <Subheading>Personality Building</Subheading> 
                <Subheading>Physical Wellness</Subheading> 
                <Subheading>Mental Health</Subheading>
              </p>
              <Events events={showcase.events} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showcase: state.showcase,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEvents: (events) => dispatch(setEvents(events)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCase);

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
`;