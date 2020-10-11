import React from 'react';
import { Grid, Form, Button, Checkbox, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { signUpWithUserData } from '../../firebase/authentication';

class Signup extends React.Component {

  state = {
    firstName: 'Vineet',
    lastName: 'Srivastav',
    email: 'vineetvk01@gmail.com',
    password: 'Qwerty@123',
    cpassword: 'Qwerty@123',
    error: '',
    success: false,
  }

  componentDidUpdate(_, prevState){
    const { error, success } = prevState;
    if(error || success){
      console.log('[info] Will be resetting messages in 3s');
      setTimeout(()=>{
        this.setState({
          error: '',
          success: false,
        })
      }, 3000);
    }
  }

  handleSignup = () => {
    const { firstName, lastName, email, password, cpassword } = this.state;

    if(password !== cpassword){
      this.setState({ error: 'Your passwords should match' });
      return;
    }

    signUpWithUserData({
      firstName,
      lastName,
      email,
      password,
    }).then((res) => {
      console.log(res);
      this.setState({ success: true });
    }).catch(e=>{
      console.error(e);
      this.setState({ error: e.message });
    })
  }

  render() {
    const { firstName, lastName, email, password, cpassword, error, success } = this.state;

    return (
      <Container >
        <h2>Welcome to Wigggle</h2>
        <Form onSubmit={this.handleSignup}>
          <Grid>
            { (error || success) && 
              <Grid.Row>
                <Grid.Column width={8}>
                  {error && 
                    <Message negative>
                      <Message.Header>We're sorry there was an issue while signup</Message.Header>
                      <p>{error}</p>
                    </Message>
                  }
                  { success &&
                    <Message positive>
                        <Message.Header>Your user registration was successful</Message.Header>
                        <p>You can go the profile page</p>
                    </Message>
                  }
                </Grid.Column>
              </Grid.Row>
            }
            <Grid.Row>
              <Grid.Column width={4}>
                  <Form.Field required>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={e=>this.setState({ firstName: e.target.value})} />
                  </Form.Field>
              </Grid.Column>
              <Grid.Column width={4}>
                  <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={e=>this.setState({ lastName: e.target.value})} />
                  </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                  <Form.Field required>
                    <label>Email</label>
                    <input placeholder='Your Email' value={email} onChange={e=>this.setState({ email: e.target.value})} />
                  </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                  <Form.Field required>
                    <label>Password</label>
                    <input type='password' placeholder='Keep something unique' value={password} onChange={e=>this.setState({ password: e.target.value})} />
                  </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                  <Form.Field required>
                    <label>Confirm Password</label>
                    <input type='password' placeholder='This should match the above' value={cpassword} onChange={e=>this.setState({ cpassword: e.target.value})} />
                  </Form.Field>
                  <Form.Field required>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button type='submit' primary>Signup</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    )
  }
}

export default Signup;

const Container = styled.div`
  padding: 50px;
`