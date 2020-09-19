import React from 'react';
import { Grid, Form, Checkbox } from 'semantic-ui-react';
import _ from 'lodash';

const movies = [
  'Drama', 'Thriller', 'Action', 'Sci Fi', 'Romance', 'Horror', 'Comedy', 'I like all movies', 'I don\'t like movies', 'Other'
]

const sports = [
  'Adventure', 'Cricket', 'Football', 'Automobile', 'I like all sports', 'I don\'t like sports', 'Others'
]

const events = [
  "Live music Concerts", "Theatres and Plays", "Classical music", "EDM", "Standup Comedy", "Workshops", "Exhibitions and Fairs", "I enjoy all the above events",
  "No, I don't enjoy the above events", "Others"
]

const languages = [
  "Hindi", "English", "Marathi", "Tamil", "Telugu", "Malayalam", "Bengali", "kannada"
]

const Choices = ({type, name}) => {
  return (
    <Form>
      <h5>{name}</h5>
      <Grid>
        <Grid.Row>
          {
            _.map(type, (movie) => {
              return (
                <Grid.Column width={4}>
                  <Form.Field style={{marginTop: '10px'}}>
                    <Checkbox label={movie} />
                  </Form.Field>
                </Grid.Column>
              )
            })
          }
        </Grid.Row>
      </Grid>
    </Form>
  )
}

const PersonalPreferences = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Choices type={movies} name="Movies" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Choices type={sports} name="Sports" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Choices type={events} name="Event & Plays" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Choices type={languages} name="Language Preference" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default PersonalPreferences;