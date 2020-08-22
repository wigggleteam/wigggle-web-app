import React from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  MenuItem,
  Segment,
  Sidebar
} from 'semantic-ui-react';

const SideMenu = ({ children, visible, setVisible }) => {

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
              Home
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
              Games
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
              Channels
            </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}


const BasicLayout = ({ children, setVisible }) => (
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
        <Logo style={{ width: '100%', textAlign: 'center', fontFamily: `'Quicksand', sans-serif !important` }}>Wigggle</Logo>
      </CenterBox>
      <Menu.Menu position='right'>
        <MenuBox width='10vw'>
          <MenuText fontSize='12px'> <Icon name='circle' size='small' style={{ color: '#fe4356' }} /> Bangalore</MenuText>
        </MenuBox>
        <MenuBox width='10vw'>
          <MenuText> Logout </MenuText>
        </MenuBox>
      </Menu.Menu>
      <MenuBox width='15vw' style={{ backgroundColor: '#fe4356', textAlign: 'center' }}>
        <WhiteMenuText>Become a host</WhiteMenuText>
      </MenuBox>
    </Menu>
    {children}
  </Body>
)

export default ({ children }) => {

  const [visible, setVisible] = React.useState(false);

  return (
    <SideMenu visible={visible} setVisible={setVisible}>
      <BasicLayout setVisible={setVisible}>
        {children}
      </BasicLayout>
    </SideMenu>
  )
}


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
`