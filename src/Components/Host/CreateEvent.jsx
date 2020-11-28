import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Grid, Icon, Step, Form, Input, TextArea, Button, Radio, Checkbox,
} from 'semantic-ui-react';
import { Range } from 'rc-slider';
import DatePicker from 'react-datepicker';
import { categoriesMappings } from '../../constants/categories';
import { amenities as amenitiesConstant } from '../../constants/amenities';
import { guestStrength as guestStrengthConstant } from '../../constants/guestStrength';
import { createNewEvent } from '../../firebase/firestore/events';
import { getImageFromGlobalGallery } from '../../firebase/firestore/config';
import CategoryBox from './components/CategoryBox';
import ImageSelector from './components/ImageSelector';
import styles from './style.less';

const Event = () => {
  const initialState = {
    step1: {
      category: null,
      subcategory: null,
      title: '',
      description: '',
      eventDate: new Date(),
    },
    step2: {
      guestStrength: '10-15',
      ageRange: [18, 30],
      amenities: [],
    },
    step3: {
      tickets: {
        ticket1: {
          name: 'basic',
          price: 100,
        },
      },
      imagesUrls: [],
    },
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [currentStep, setCurrentStep] = useState('step1');
  const [postingEvent, setPostingEvent] = useState(false);
  const [form, setForm] = useState(initialState);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [defaultImages, setDefaultImages] = useState({
    party: {
      name: 'Party',
      url: '/assets/defaults/party1.jpg',
    },
  });

  useEffect(() => {
    (async () => {
      const images = await getImageFromGlobalGallery();
      setDefaultImages(images);
    }
    )();
    return () => {};
  }, []);

  const goToNext = () => {
    if (currentStep === 'step1') {
      setCurrentStep('step2');
    }

    if (currentStep === 'step2') {
      console.log(form.step2);
      setCurrentStep('step3');
    }

    if (currentStep === 'step3') {
      setPostingEvent(true);
      console.log('Going to submit');

      createNewEvent({
        categoryL1: form.step1.category,
        categoryL2: form.step1.subcategory,
        title: form.step1.title,
        description: form.step1.description,
        eventDate: form.step1.eventDate,
        amenities: form.step2.amenities,
        ageRange: form.step2.ageRange,
        guestStrength: form.step2.guestStrength,
        tickets: form.step3.tickets,
        imagesUrls: form.step3.imagesUrls,
      });
      setTimeout(() => setPostingEvent(false), 3000);
    }
  };

  const handleCategorySelect = () => {
    setForm((form) => (
      { ...form, step1: { ...form.step1, category: selectedCategory, subcategory: selectedSubCategory } }
    ));
  };

  const handleChange = (e, { name, value }) => {
    setForm((form) => (
      { ...form, step1: { ...form.step1, [name]: value } }
    ));
    let allFilled = _.reduce(form.step1, (acc, value) => acc && Boolean(value), true);
    allFilled = allFilled && Boolean(value);
    console.log(form.step1);
    setNextDisabled(!allFilled);
  };

  const renderStep1 = () => {
    const formValueForStep = form[currentStep];

    if (!formValueForStep.category) {
      return (
        <div className={styles.categories}>
          <Grid columns="three">
            <Grid.Row>
              {_.map(categoriesMappings, (category, key) => (
                <Grid.Column key={key}>
                  <CategoryBox
                    category={category}
                    key={key}
                    id={key}
                    useSubCategory={() => [selectedSubCategory, setSelectedSubCategory]}
                    useCategory={() => [selectedCategory, setSelectedCategory]}
                    handleCategorySelect={handleCategorySelect}
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
      );
    }
    const selectedCategoryObj = _.get(categoriesMappings, form.step1.category, '--');
    const selectedSubCategoryObj = _.get(selectedCategoryObj, `subCategories.${selectedSubCategory}`, '--');

    return (
      <div className={styles.formEvent}>
        <h2>
          {selectedCategoryObj.label}
          {' '}
          -
          {' '}
          {selectedSubCategoryObj.label}
        </h2>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field
                  id="form-input-control-title"
                  control={Input}
                  label="Title"
                  placeholder="Title here"
                  name="title"
                  required
                  onChange={handleChange}
                />
                <Form.Field
                  id="form-input-control-description"
                  control={TextArea}
                  label="Description"
                  placeholder="Description here"
                  name="description"
                  required
                  onChange={handleChange}
                />
              </Form>
              <p className={styles.datePickerLabel}> Event Date: </p>
              <DatePicker
                selected={form.step1.eventDate || new Date()}
                onChange={(date) => handleChange('', { name: 'eventDate', value: date })}
                className={styles.datePicker}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  const renderStep2 = () => {
    const { ageRange, guestStrength, amenities } = form.step2;

    const handleStep2Change = (key, value) => {
      setForm((form) => (
        { ...form, step2: { ...form.step2, [key]: value } }
      ));
    };

    const handleAmenities = (e, checkbox) => {
      const { name, checked } = checkbox;
      let updatedAmenities = _.cloneDeep(amenities);

      if (amenities.indexOf(name) === -1 && checked) {
        updatedAmenities.push(name);
      }
      if (amenities.indexOf(name) > -1 && !checked) {
        updatedAmenities = amenities.filter((value) => value !== name);
      }

      handleStep2Change('amenities', updatedAmenities);
    };

    return (
      <div className={styles.guestContainer}>
        <div className={styles.guestContent}>
          <h4>Select your Guests</h4>
          <Form>
            <Form.Field>
              <label>Your party strength :</label>
            </Form.Field>
            <Form.Field>
              {
            _.map(guestStrengthConstant, (strength) => (
              <Radio
                key={strength.key}
                className={styles.radioGuestsSelector}
                label={strength.label}
                name="guestStrength"
                value={strength.key}
                checked={guestStrength === strength.key}
                onChange={(e, radio) => handleStep2Change(radio.name, radio.value)}
              />
            ))
          }
            </Form.Field>
            <Form.Field>
              <label>Age Range</label>
              <Range
                className={styles.rangeSelector}
                defaultValue={[18, 30]}
                value={ageRange}
                onChange={(value) => handleStep2Change('ageRange', value)}
                min={18}
                max={55}
                marks={{
                  18: <h5>18</h5>,
                  30: <h5>30</h5>,
                  40: <h5>40</h5>,
                  55: <h5>55</h5>,
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Guest Rules / Amenities </label>
              {
            _.map(amenitiesConstant, (value) => (
              <>
                <Checkbox label={value.label} name={value.key} checked={amenities.indexOf(value.key) > -1} onChange={handleAmenities} />
                {' '}
                <br />
              </>
            ))
          }
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const { tickets } = form.step3;

    const handleTicketChange = (key, value) => {
      const { name, price } = value;
      const ticketUpdated = _.cloneDeep(form.step3.tickets[key]);
      console.log(key);
      if (name != null) {
        ticketUpdated.name = name;
        setForm((form) => (
          { ...form, step3: { ...form.step3, tickets: { ...form.step3.tickets, [key]: ticketUpdated } } }
        ));
      }
      if (price) {
        if (isNaN(Number(price))) {
          return;
        }
        ticketUpdated.price = Number(price);
        setForm((form) => (
          { ...form, step3: { ...form.step3, tickets: { ...form.step3.tickets, [key]: ticketUpdated } } }
        ));
      }
    };

    const handleImagesUpdate = (imagesUrls) => {
      setForm((form) => (
        { ...form, step3: { ...form.step3, imagesUrls } }
      ));
    }

    const addTicket = () => {
      const ticketUpdated = _.cloneDeep(form.step3.tickets);
      const previousTicketsPresent = _.reduce(ticketUpdated, (acc, ticket) => {
        const { name, price } = ticket;
        return acc && Boolean(name) && Boolean(Number(price) && name !== 'New');
      }, true);

      if (!previousTicketsPresent) {
        return;
      }

      const ticketId = `ticket-${Date.now()}`;
      setForm((form) => (
        { ...form, step3: { ...form.step3, tickets: { ...form.step3.tickets, [ticketId]: { name: 'New', price: '0' } } } }
      ));
    };

    return (
      <div className={styles.ticketContainer}>
        <h2>Create ticket :</h2>
        {
          _.map(tickets, (value, key) => (
            <>
              <Input
                icon="ticket alternate"
                iconPosition="left"
                placeholder="Ticket Name"
                value={value.name}
                onChange={(e, inputValue) => handleTicketChange(key, { name: inputValue.value })}
                className={styles.ticketName}
              />
              <Input
                icon="rupee"
                iconPosition="left"
                placeholder="Price for ticket"
                value={value.price}
                onChange={(e, inputValue) => handleTicketChange(key, { price: inputValue.value })}
                className={styles.ticketPrice}
              />
              <br />
              {' '}
              <br />
            </>
          ))
        }
        <br />
        <Button icon className={styles.addTicket} onClick={addTicket}>
          <Icon name="plus" />
        </Button>
        <div>
          <h2>Select Image for your Event</h2>
          <ImageSelector
            eventImagesUrls={form.step3.imagesUrls}
            defaultImages={defaultImages}
            handleImagesUpdate={handleImagesUpdate}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <div className={styles.container}>
              <h2>Bring your talent out... Host now</h2>
              <Step.Group stackable="tablet">
                <Step active={currentStep === 'step1'}>
                  <Icon name="edit" />
                  <Step.Content>
                    <Step.Title>Select Category</Step.Title>
                    <Step.Description>Choose the category of your event</Step.Description>
                  </Step.Content>
                </Step>
                <Step active={currentStep === 'step2'}>
                  <Icon name="users" />
                  <Step.Content>
                    <Step.Title>Guests</Step.Title>
                    <Step.Description>Define your guests</Step.Description>
                  </Step.Content>
                </Step>
                <Step active={currentStep === 'step3'}>
                  <Icon name="dollar" />
                  <Step.Content>
                    <Step.Title>Tickets</Step.Title>
                    <Step.Description>Create tickets for your event</Step.Description>
                  </Step.Content>
                </Step>

              </Step.Group>
              {
                currentStep === 'step1' && renderStep1()
              }
              {
                currentStep === 'step2' && renderStep2()
              }
              {
                currentStep === 'step3' && renderStep3()
              }
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <div className={styles.nextButtonContainer}>
              <Button disabled={nextDisabled} className={styles.nextButton} onClick={() => goToNext()} size="huge" icon labelPosition="right" loading={postingEvent}>
                { currentStep === 'step3' ? (
                  <>
                    Submit
                    <Icon name="check" />
                  </>
                ) : (
                  <>
                    Next
                    <Icon name="right arrow" />
                  </>
                ) }
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Event;
