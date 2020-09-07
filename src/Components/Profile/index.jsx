import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { getEventsFromFireStore } from '../../firebase/firestoreServices';
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
      <Container>
        <h5>Profile</h5>
        <h3>Health and Wellness - <span>12 Events</span></h3>
        
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