import React from 'react';
import { Grid, Image, Form, Button } from 'semantic-ui-react';
import faker from 'faker';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const UserDetails = () => {
  return (
    <Form>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Email</label>
              <input placeholder='First Name' />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Mobile</label>
              <input placeholder='Last Name' />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field>
              <label>Gender</label>
              <Form.Select options={options} placeholder='Gender' />
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
              <Button size='medium' type='submit'>Update</Button>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

const ProfileDetails = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <UserDetails />
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={faker.image.avatar()} size='medium' circular />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default ProfileDetails;