import React from 'react';
import { connect } from 'react-redux';
import { loginRequest, setErrorAction } from '../model/auth/actions';
import { Button, Divider, Form, Grid, Icon, Message } from 'semantic-ui-react'
import styled from 'styled-components';
import { isValidEmail, isValidMobile } from '../utils/validations';
import { socialLogin } from '../firebase/authentication';
class AuthUserModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      credential: '',
      fieldType: undefined,
      fieldValue: '',
      error: undefined
    }
  }

  componentDidMount() {
    console.log('User Login modal is open')
  }

  validate = () => {
    const { setError } = this.props;
    this.setState({ loading: true });
    const validEmail = isValidEmail(this.state.credential);
    const validMobile = isValidMobile(this.state.credential);
    if (validEmail || validMobile) {
      if (validEmail) {
        this.setState({ fieldType: 'password' })
      }
      if (validMobile) {
        this.setState({ fieldType: 'otp' })
      }
    } else {
      setError('Error: Invalid Email or Mobile Number.');
      setTimeout(() => setError(''), 1900);
    }
    setTimeout(() => this.setState({ loading: false }), 900);
  }

  login = () => {
    const { credential, fieldValue } = this.state;
    const payload = {
      email: credential,
      password: fieldValue
    }
    this.props.loginRequest('email', payload);
  }

  socialLogin = (provider) => {
    const { setLoginVisible } = this.props;
    setLoginVisible(false);
    return socialLogin(provider);
  }

  render() {
    const { setLoginVisible, auth } = this.props;
    const { fieldType, credential, fieldValue, error } = this.state;
    let display = 'none';
    if (fieldType) {
      display = undefined;
    }
    return (
      <AuthWindow>
        <Icon name='close' style={{ float: 'right', cursor: 'pointer' }} onClick={() => setLoginVisible(false)} />
        <Title>Welcome to Wigggle</Title>
        <div style={{ width: '60%', margin: '0 auto' }}>
          <p>Join using</p>
        </div>
        <br />
        <Grid centered columns={2}>
          <Grid.Column>
            <SocialMedia color='#47599A' float='right' onClick={() => this.socialLogin("facebook")} >
              <Icon name='facebook square' /> FACEBOOK
            </SocialMedia>
          </Grid.Column>
          <Grid.Column>
            <SocialMedia color='#DE4B33' float='left' onClick={() => this.socialLogin("google")}>
              <Icon name='google' /> GOOGLE
              </SocialMedia>
          </Grid.Column>
        </Grid>
        <div style={{ clear: 'both', width: '50%', margin: '0 auto' }}>
          <Divider horizontal>Or</Divider>
        </div>
        <div style={{ width: '60%', margin: '0 auto' }}>
          <Form onSubmit={() => { fieldType ? this.login() : this.validate() }}>
            <p>Enter your Number / Email</p>
            { auth.error && 
              <Message negative style={{ padding: 10, width: '90%'}}>
                <p>{auth.error}</p>
              </Message>
            }
            <Form.Input
              error={Boolean(error)}
              placeholder='Email/Number'
              disabled={fieldType ? true : false}
              value={credential}
              onChange={(e) => this.setState({ credential: e.target.value })}
              style={{ width: '90%' }} />
            <Form.Input
              type='password'
              placeholder={fieldType === 'password' ? 'Enter Password' : 'Enter OTP'}
              value={fieldValue}
              onChange={(e) => this.setState({ fieldValue: e.target.value })}
              style={{ width: '90%', marginTop: '10px', display }} />
            <Button loading={this.state.loading} style={{ backgroundColor: '#F24C59', width: '150px', color: '#fff', marginTop: '15px' }} >
              {fieldType ? 'Sign in' : 'Continue'}
            </Button>
          </Form>

          <p style={{ fontSize: '12px', marginTop: '10px' }}>By signing In, I agree to Terms and Condition</p>
        </div>
      </AuthWindow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (method, credentials) => dispatch(loginRequest(method, credentials)),
    verifyLogin: () => dispatch({type: 'VERIFY_LOGIN'}),
    setError: (error) =>  dispatch(setErrorAction(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthUserModal);

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


