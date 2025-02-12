import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {
  Icon,
  Image,
  Menu,
  MenuItem,
  Segment,
  Sidebar,
  Grid,
  Input,
  Modal,
} from 'semantic-ui-react';
import Link from 'next/link';
import { connect } from 'react-redux';
import AuthUserModal from './Authentication';
import { Footer } from './Footer';
import { categoriesMappings } from '../constants/categories';
import { logoutUserAction } from '../model/auth/actions';
import { getServerInfo } from '../firebase/firestore/config';

const ProfileBox = ({ auth }) => {
  let href = '/signup';
  if (auth.isLoggedIn) {
    href = '/profile';
  }

  const photoURL = auth.isLoggedIn ? _.get(auth, 'userInfo.photoURL') || _.get(auth, 'user.photoURL') || 'assets/user.png' : 'assets/user.png';

  return (
    <Grid style={{ padding: '10px' }}>
      <Grid.Row>
        <Grid.Column width={6}>
          <Link href={href}>
            <div>
              <Image src={photoURL} size="medium" circular />
            </div>
          </Link>
        </Grid.Column>
        <Grid.Column width={10}>
          <Link href={href}>
            <div>
              <WelcomeText>
                Hi,
                {auth.isLoggedIn ? _.get(auth, 'user.displayName') || 'Name not found' : 'Guest' }
              </WelcomeText>
              <Join>Lets know each other better</Join>
            </div>
          </Link>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  );
};

const SideMenu = ({
  children, visible, setVisible, auth,
}) => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      onHide={() => setVisible(false)}
      vertical
      visible={visible}
      width="wide"
    >
      <Menu.Item as="a" style={{ padding: '20px 0' }}>
        <ProfileBox auth={auth} />
      </Menu.Item>

      {_.map(categoriesMappings, (category, key) => (
        <Link key={key} href="/showcase">
          <Menu.Item key={key} as="a" style={{ padding: '20px 0' }}>
            <Category key={key}>{category.label}</Category>
          </Menu.Item>
        </Link>
      ))}
    </Sidebar>

    <Sidebar.Pusher dimmed={visible}>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const BasicLayout = ({
  children, setVisible, setLoginVisible, auth, logoutUser,
}) => {
  const handleAuth = () => {
    if (auth.isLoggedIn) {
      logoutUser();
    } else {
      setLoginVisible(true);
    }
  };

  const [config, setConfig] = useState({});

  useEffect(() => {
    getServerInfo().then(setConfig);
  });

  return (
    <Body>
      <Menu size="huge">
        <Menu.Menu position="left" key="menu-left">
          <MenuBox width="10vw" onClick={(e) => setVisible(true)}>
            <MenuText>
              <Icon name="bars" size="large" />
              {' '}
              Menu
              {' '}
            </MenuText>
          </MenuBox>
          <MenuBox width="25vw">
            <MenuText>
              <Input style={{ margin: 0, width: '40%', float: 'left' }} loading={false} icon="search" placeholder="Search..." />
            </MenuText>
          </MenuBox>
        </Menu.Menu>
        <CenterBox width="30vw">
          <Link href="/">
            <Logo style={{
              width: '100%', textAlign: 'center', fontFamily: '\'Quicksand\', sans-serif !important', cursor: 'pointer',
            }}
            >
              Wigggle
            </Logo>
          </Link>
        </CenterBox>
        <Menu.Menu position="right" key="right-menu">
          <MenuBox width="10vw">
            <MenuText fontSize="12px">
              {' '}
              <Icon name="circle" size="small" style={{ color: '#fe4356' }} />
              {' '}
              Bangalore
            </MenuText>
          </MenuBox>
          <MenuBox width="10vw" onClick={handleAuth}>
            <MenuText>
              {' '}
              {auth.isLoggedIn ? 'Logout' : 'Login' }
              {' '}
            </MenuText>
          </MenuBox>
        </Menu.Menu>
        <MenuBox width="15vw" style={{ backgroundColor: '#fe4356', textAlign: 'center' }}>
          <Link href="/profile">
            <WhiteMenuText>Become a host</WhiteMenuText>
          </Link>
        </MenuBox>
      </Menu>
      <div style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </Body>
  );
};

const Layout = ({ children, auth, logoutUser }) => {
  const [visible, setVisible] = React.useState(false);
  const [loginVisible, setLoginVisible] = React.useState(false);

  useEffect(() => {
    if (auth.isLoggedIn) {
      setLoginVisible(false);
    }
  }, [auth.isLoggedIn]);

  return (
    <SideMenu visible={visible} setVisible={setVisible} auth={auth}>
      <BasicLayout
        setVisible={setVisible}
        setLoginVisible={setLoginVisible}
        auth={auth}
        logoutUser={logoutUser}
      >
        {children}
        <Modal open={loginVisible}>
          <AuthUserModal setLoginVisible={setLoginVisible} />
        </Modal>
      </BasicLayout>
    </SideMenu>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAction()),
});

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

const MenuText = styled.div`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
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

const WelcomeText = styled.h4`
  text-align: left;
  font-weight: 500;
  margin: 5px;
`;

const Join = styled.h5`
  text-align: left;
  font-weight: 500;
  margin: 5px;
  color: #888;
`;

const GoTo = styled.h5`
  text-align: left;
`;
