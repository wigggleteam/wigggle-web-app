import React, { useState } from 'react';
import { Grid, Image, Form, Button, Dimmer, Loader, Message, Step, Icon, Divider, Header } from 'semantic-ui-react';
import { cities, states } from '../../utils/cityAndStates';
import { isValidEmail, isValidMobile } from '../../utils/validations';
import { setUsersInfoToFireStore } from '../../firebase/firestore/firestoreServices';
import _ from 'lodash';
import styled from 'styled-components';
import PhotoUploadModal from './PhotoUploadModal';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const citiesOption = _.values(cities).map((cityObj) => {
  return { key: cityObj.key, text: cityObj.city, value: cityObj.key}
})

const statesOption = _.map(states, (state, index) => {
  return { key: index, text: state, value: state}
})

const datesOptions = (()=>{
  const option = []
  for(let i = 1; i <= 31; i++){
    option.push({ key: i, text:i, value:i})
  }
  return option;
})();

const monthsOptions = (()=>{
  const option = []
  for(let i = 1; i <= 12; i++){
    option.push({ key: i, text:i, value:i})
  }
  return option;
})();

const yearsOptions = (()=>{
  const option = []
  for(let i = 1945; i <= 2010; i++){
    option.push({ key: i, text:i, value:i})
  }
  return option;
})();

const UserDetails = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [errorsArray, setErrorsArray] = useState([])
  const [email, setEmail ] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [address, setAddress] = useState(user.address);

  const errorsCheck = () => {
    const errors = [];
    if(!firstName || firstName === ""){
      errors.push('First name is required');
    }
    if(!lastName || lastName === ""){
      errors.push('Last name is required');
    }
    if(!email || email === "" || !isValidEmail(email)){
      errors.push('Email is not Valid');
    }
    if(!mobile || mobile === "" || !isValidMobile(mobile)){
      errors.push('Mobile is not Valid');
    }
    if(!gender || gender === ""){
      errors.push('Select gender');
    }
    if(!address.house || !address.landmark || !address.city || !address.state || !address.pincode || address.house === "" || address.landmark === "" || address.pincode === ""){
      errors.push('Address is not valid.');
    }
    setErrorsArray(errors);
    if(errors.length > 0) return false;
    return true;
  }
  
  const handleUserInfo = () => {
    if(errorsCheck()){
      setLoading(true);
      setUsersInfoToFireStore(user.uid, {
        firstName, lastName, gender, dob, address, mobile
      }).then(()=>{
        setTimeout(()=>setLoading(false),2000);
      })
    }
  }

  return (
    <div>
    <Dimmer active={loading} inverted>
      <Loader>Just a sec...</Loader>
    </Dimmer>
    { errorsArray.length > 0 && 
      <Message
        error
        header='Oops! There was/were errors while updating.'
        list={errorsArray}
      />
    }
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
              <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Mobile</label>
              <input placeholder='Mobile Number' value={mobile} onChange={e => setMobile(e.target.value)}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Gender</label>
              <Form.Select options={options} placeholder='Gender' value={gender} onChange={(e, target) => setGender(target.value)} />
            </ Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Field>
              <Form.Select options={datesOptions} placeholder='Day' value={dob.date} onChange={(e, target) => setDob((dob) => { dob.date = target.value; return _.cloneDeep(dob); })}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Field>
              <Form.Select options={monthsOptions} placeholder='Month' value={dob.month} onChange={(e, target) => setDob((dob) => { dob.month = target.value; return _.cloneDeep(dob); })}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Field>
              <Form.Select options={yearsOptions} placeholder='year' value={dob.year} onChange={(e, target) => setDob((dob) => { dob.year = target.value; return _.cloneDeep(dob); })}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Field>
              <label>Address</label>
              <input placeholder='House Address' value={address.house} onChange={(e) => { e.persist(); setAddress((address) => { address.house = e.target.value; return _.cloneDeep(address); })}}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <input placeholder='Landmark' value={address.landmark} onChange={(e) => { e.persist(); setAddress((address) => { address.landmark = e.target.value; return _.cloneDeep(address); })}}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <Form.Select options={citiesOption} placeholder='City' value={address.city} onChange={(e, target) => { e.persist(); setAddress((address) => { address.city = target.value; return _.cloneDeep(address); })}}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <input placeholder='Pincode' value={address.pincode} onChange={(e) => { e.persist(); setAddress((address) => { address.pincode = e.target.value; return _.cloneDeep(address); })}}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <Form.Select options={statesOption} placeholder='State' value={address.state} onChange={(e, target) => { e.persist(); setAddress((address) => { address.state = target.value; return _.cloneDeep(address); })}}/>
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
    </div>
  )
}

const ProfileDetails = ({auth}) => {

  const [imageModal, setImageModal] = useState(false);

  console.log(auth);
  const userInfo = {};
  userInfo.uid = _.get(auth, 'user.uid', -1);
  userInfo.firstName = _.get(auth, 'userInfo.firstName', "");
  userInfo.lastName = _.get(auth, 'userInfo.lastName', "");
  userInfo.email = _.get(auth, 'user.email', "");
  userInfo.photoURL = _.get(auth, 'userInfo.photoURL') || _.get(auth, 'user.photoURL') || "assets/user.png";
  userInfo.address = _.get(auth, 'userInfo.address', {});
  userInfo.dob = _.get(auth, 'userInfo.dob', {});
  userInfo.gender = _.get(auth, 'userInfo.gender',);
  userInfo.mobile = _.get(auth, 'userInfo.mobile');
  
  const status = _.get(auth, 'userInfo.status', 0);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <UserDetails user={userInfo}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <ImageContainer onClick={()=> setImageModal(true)}>
              <Image src={userInfo.photoURL} size='medium' circular />
            </ImageContainer>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='users' />
                Status
              </Header>
            </Divider>
            <Step.Group vertical fluid>
              <Step completed={status > 0}>
                <Icon name='wpforms' />
                <Step.Content>
                  <Step.Title>Complete Info</Step.Title>
                  <Step.Description>Fill your information here.</Step.Description>
                </Step.Content>
              </Step>

              <Step completed={status > 1}>
                <Icon name='search' />
                <Step.Content>
                  <Step.Title>Processing</Step.Title>
                  <Step.Description>Verification by team.</Step.Description>
                </Step.Content>
              </Step>

              <Step completed={status > 2}>
                <Icon name='thumbs up' />
                <Step.Content>
                  <Step.Title>Verified</Step.Title>
                  <Step.Description>Ready to book events.</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <PhotoUploadModal visible={imageModal} setVisible={setImageModal} />
    </div>
  )
}

export default ProfileDetails;

const ImageContainer = styled.div`
    width: 300px;
    height: 300px;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
`;