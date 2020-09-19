import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';
import { Grid, Divider } from 'semantic-ui-react';
import { getEventsFromFireStore } from '../../firebase/firestoreServices';
import { fetchDataFromEventSnapshot } from '../../firebase/utils';
import { setEvents } from '../../model/showcase/actions';

import PersonalDetails from './PersonalDetails';

const PERSONAL_DETAILS = 'pd';
const PERSONAL_PREFERENCES = 'pp';
const UPCOMING_EVENTS = 'ue';
const WISHLIST = 'w';
const BECOME_A_HOST = 'bah';

const sections = {
  [PERSONAL_DETAILS] : {
    key: PERSONAL_DETAILS,
    label: 'Personal Details',
    component: (props) => <PersonalDetails {...props} />,
  },
  [PERSONAL_PREFERENCES]: {
    key: PERSONAL_PREFERENCES,
    label: 'Personal Preferences',
  },
  [UPCOMING_EVENTS]: {
    key: UPCOMING_EVENTS,
    label: 'Upcoming Events',
  },
  [WISHLIST]: {
    key: WISHLIST,
    label: 'Wishlist',
  },
  [BECOME_A_HOST]: {
    key: BECOME_A_HOST,
    label: 'Become a Host',
  }
}

class ShowCase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: PERSONAL_DETAILS,
    }
  }

  handleSectionChange = (key) =>{
    this.setState({activeKey: key})
  }

  render(){
    const { activeKey = PERSONAL_DETAILS } = this.state;

    return(
      <Container>
        <h2>Profile</h2>
        <Divider />
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
              { 
                _.map(_.values(sections), (section) => {
                  const isActive = section.key === activeKey; 
                  return <Section key={section.key} active={isActive} onClick={()=> this.handleSectionChange(section.key)}> {section.label} </Section>;
                })
              }
            </Grid.Column>
            <Grid.Column width={13}>
              { sections[activeKey].component && sections[activeKey].component() || <div>Error</div>  }
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

const Section = styled.h3`
  color: ${props => props.active ? '#F24B54': '#000' };
  cursor: pointer;
`;