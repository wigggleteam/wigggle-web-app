import React, {Component} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Grid, Divider } from 'semantic-ui-react';
import withAuthentication from '../../HOC/isAuthenticated';

import PersonalDetails from './PersonalDetails';
import PersonalPreferences from './PersonalPreferences';
import UpcomingEvents from './UpcomingEvents';
import WishList from './WishList';
import Host from './Host/index';

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
    component: (props) => <PersonalPreferences {...props} />,
  },
  [UPCOMING_EVENTS]: {
    key: UPCOMING_EVENTS,
    label: 'Upcoming Events',
    component: (props) => <UpcomingEvents {...props} />,
  },
  [WISHLIST]: {
    key: WISHLIST,
    label: 'Wishlist',
    component: (props) => <WishList {...props} />,
  },
  [BECOME_A_HOST]: {
    key: BECOME_A_HOST,
    label: 'Host',
    component: (props) => <Host {...props} />,
  }
}

class Profile extends Component {

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
    const { auth } = this.props;
    if(!auth.user || !auth.userInfo){
      console.error("Authentication | Secured route without user info");
    }

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
              { sections[activeKey].component && sections[activeKey].component({auth }) || <div>Error</div>  }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </Container>
    )
  }
}

const AuthenticatedProfile = withAuthentication(Profile);

export default AuthenticatedProfile;

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