import React, { useState } from 'react';
import { Grid, Image, Form, Button } from 'semantic-ui-react';
import { setUsersInfoToFireStore } from '../../firebase/firestoreServices';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const UserDetails = ({user}) => {
  const [email, setEmail ] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [address, setAddress] = useState(user.address);

  const handleUserInfo = () => {
    setUsersInfoToFireStore(user.uid, {
      firstName, lastName, gender
    })
  }

  return (
    <Form>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' value={email} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Mobile</label>
              <input placeholder='Mobile Number' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Gender</label>
              <Form.Select options={options} placeholder='Gender' value={gender} />
            </ Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Field>
              <Form.Select options={options} placeholder='Day' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Field>
              <Form.Select options={options} placeholder='Month' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Field>
              <Form.Select options={options} placeholder='year' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Field>
              <label>Address</label>
              <input placeholder='Address Line 1' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <input placeholder='Landmark' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <Form.Select options={options} placeholder='year' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <input placeholder='Pincode' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <Form.Select options={options} placeholder='year' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <Button size='medium' type='submit' onClick={handleUserInfo}>Update</Button>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

const ProfileDetails = ({auth, setUserInfo}) => {
  
  const userInfo = {};
  userInfo.uid = _.get(auth, 'user.uid', -1);
  userInfo.firstName = _.get(auth, 'userInfo.firstName', "");
  userInfo.lastName = _.get(auth, 'userInfo.lastName', "");
  userInfo.email = _.get(auth, 'user.email', "");
  userInfo.photoURL = _.get(auth, 'user.photoURL', '/assets/banner1.png');

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <UserDetails user={userInfo}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={userInfo.photoURL} size='medium' circular />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default ProfileDetails;