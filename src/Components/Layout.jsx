import React, { useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {
  Icon,
  Image,
  Menu,
  MenuItem,
  Segment,
  Sidebar,
  Grid
} from 'semantic-ui-react';
import AuthUserModal from './Authentication';
import { Footer } from './Footer';
import { categories } from '../constants/categories';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logoutUserAction } from '../model/auth/actions';

const ProfileBox = ({ auth }) => {

  return (
    <Grid style={{padding: '10px'}}>
      <Grid.Row>
        <Grid.Column width={6}>
          <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' circular />
        </Grid.Column>
        <Grid.Column width={10}>
          <Welcome>Hi, {auth.isLoggedIn ? _.get(auth, 'user.displayName') || 'Name not found' : 'Guest' }  </Welcome>
          <Join>Lets know each other better</Join>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const SideMenu = ({ children, visible, setVisible, auth }) => {

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='wide'
      >
        <Menu.Item as='a' style={{ padding: '20px 0' }}>
          <ProfileBox auth={auth} />
        </Menu.Item>

        {_.map(categories, (category) => {
          return (
            <Link href='/showcase'>
              <Menu.Item as='a' style={{ padding: '20px 0' }}>
                <Category>{category.label}</Category>
              </Menu.Item>
            </Link>
            )
        })}
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}


const BasicLayout = ({ children, setVisible, setLoginVisible, auth, logoutUser }) => {

  const handleAuth = () => {
    if(auth.isLoggedIn){
      logoutUser()
    }else{
      setLoginVisible(true);
    }
  }

  return(
  <Body>
    <Menu size='huge'>
      <Menu.Menu position='left'>
        <MenuBox width='10vw' onClick={(e) => setVisible(true)}>
          <MenuText><Icon name='bars' size='large' /> Menu </MenuText>
        </MenuBox>
        <MenuBox width='5vw'>
          <MenuText><Icon name='search' /></MenuText>
        </MenuBox>
      </Menu.Menu>
      <CenterBox width='50vw'>
        <Link href='/'>
          <Logo style={{ width: '100%', textAlign: 'center', fontFamily: `'Quicksand', sans-serif !important`, cursor: 'pointer' }}>Wigggle</Logo>
        </Link>
      </CenterBox>
      <Menu.Menu position='right'>
        <MenuBox width='10vw'>
          <MenuText fontSize='12px'> <Icon name='circle' size='small' style={{ color: '#fe4356' }} /> Bangalore</MenuText>
        </MenuBox>
        <MenuBox width='10vw' onClick={handleAuth}>
          <MenuText> {auth.isLoggedIn ? 'Logout' : 'Login' } </MenuText>
        </MenuBox>
      </Menu.Menu>
      <MenuBox width='15vw' style={{ backgroundColor: '#fe4356', textAlign: 'center' }}>
        <WhiteMenuText>Become a host</WhiteMenuText>
      </MenuBox>
    </Menu>
    {children}
    <Footer />
  </Body>)
}

const Layout = ({ children, auth, logoutUser }) => {

  const [visible, setVisible] = React.useState(false);
  const [loginVisible, setLoginVisible] = React.useState(false);

  useEffect(() => {
    if(auth.isLoggedIn){
      setLoginVisible(false);
    }
  },[auth.isLoggedIn])

  return (
    <SideMenu visible={visible} setVisible={setVisible} auth={auth}>
      <BasicLayout 
        setVisible={setVisible} 
        setLoginVisible={setLoginVisible} 
        auth={auth} 
        logoutUser={logoutUser}>
        {children}
        {loginVisible ? <AuthUserModal setLoginVisible={setLoginVisible} /> : ''}
      </BasicLayout>
    </SideMenu>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUserAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


/* Styled Components */

const Body = styled.div`
  font-family: 'Quicksand', sans-serif !important;
`;

const WhiteMenuText = styled.p`
  font-size: 14px;
  font-weight: 600 !important;
  color: #fff !important;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center !important;
  width: inherit;
  font-family: 'Quicksand', sans-serif !important;
`;

const MenuText = styled.p`
  font-size: ${(props) => props.fontSize ? props.fontSize : '14px'};
  font-weight: 400 !important;
  cursor: pointer;
  color: #666 !important;
  width: inherit;
`;

const CenterBox = styled(MenuItem)`
  width: ${(props) => props.width};
  font-family: 'Quicksand', sans-serif !important;
  &::before{
    background-color: #fff !important;
  }
`;

const MenuBox = styled(MenuItem)`
  width: ${(props) => props.width};
  text-align: center;

  &::before{
    background-color: #fff !important;
  }
`;

const Logo = styled.h2`
  font-weight: 500;
`;

const Category = styled.h3`
  margin: 10px 20px;
  text-align: left;
  font-weight: 500;
`;

const Welcome = styled.h3`
  text-align: left;
  font-weight: 500;
  margin: 5px;
`

const Join = styled.h5`
  text-align: left;
  font-weight: 500;
  margin: 5px;
  color: #888;
`