import React from 'react';
import { Button, Divider, Grid, Icon, Input } from 'semantic-ui-react'
import styled from 'styled-components';
import { isValidEmail, isValidMobile } from '../utils/validations';

export default class AuthUserModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      credential: '',
      fieldType: undefined,
      fieldValue: '',
    }
  }

  validate = () => {
    this.setState({loading: true});
    const validEmail = isValidEmail(this.state.credential);
    const validMobile = isValidMobile(this.state.credential);
    if(validEmail || validMobile){
      if(validEmail){
        this.setState({fieldType: 'password'})
      }
      if(validMobile){
        this.setState({fieldType: 'otp'})
      }
    }
    setTimeout(()=>this.setState({loading: false}), 900);
  }

  login = () => {
    const {credential, fieldValue } = this.state;
    console.log(credential, fieldValue);
  }

  render() {
    const { fieldType, credential, fieldValue } = this.state;
    let display = 'none';
    if(fieldType){
      display = undefined;
    }
    return (
      <AuthWindow>
          <Icon name='close' style={{ float: 'right', cursor: 'pointer' }} />
          <Title>Welcome to Wigggle</Title>
          <div style={{width: '60%',  margin: '0 auto'}}>
            <p>Join using</p>
          </div>
          <br />
          <Grid centered columns={2}>
            <Grid.Column>
              <SocialMedia color='#47599A' float='right'>
                <Icon name='facebook square' /> FACEBOOK
              </SocialMedia>
            </Grid.Column>
            <Grid.Column>
              <SocialMedia color='#DE4B33' float='left'> 
                <Icon name='google' /> GOOGLE
              </SocialMedia>
            </Grid.Column>
          </Grid>
          <div style={{ clear: 'both', width: '50%', margin: '0 auto' }}>
            <Divider horizontal>Or</Divider>
          </div>
          <div style={{width: '60%',  margin: '0 auto'}}>
            <p>Enter your Number / Email</p>
            <Input  
              placeholder='Email/Number' 
              disabled={fieldType ? true : false}
              value={credential}
              onChange={(e)=>this.setState({credential: e.target.value})}
              style={{width: '90%'}} />
            <Input
              type='password'
              placeholder={ fieldType === 'password' ? 'Enter Password' : 'Enter OTP' } 
              value={fieldValue}
              onChange={(e)=>this.setState({fieldValue: e.target.value})}
              style={{width: '90%', marginTop: '10px', display }} />
            <Button loading={this.state.loading} style={{backgroundColor: '#F24C59', width: '150px', color: '#fff', marginTop: '15px' }} onClick={() => {fieldType ? this.login() : this.validate()}}>
              {fieldType ? 'Sign in' : 'Continue'}
            </Button>
            <p style={{fontSize: '12px', marginTop: '10px'}}>By signing In, I agree to Terms and Condition</p>
          </div>
        </AuthWindow>
    )
  }
}

const AuthWindow = styled.div`
  position: absolute;
  background-color: #fff;
  top: 20vh;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 100;
  min-height: 400px;
  min-width: 700px;
  padding: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  padding-top: 15px;
`;

const SocialMedia = styled.div`
  border: ${(props) => `3px solid ${props.color}`} ;
  color: ${(props) => `${props.color}`} ;
  float: ${(props) => `${props.float}`} ;
  width: 200px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  padding: 10px 0;
  cursor: pointer;
`;


