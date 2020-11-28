import React, { useState } from 'react';
import _ from 'lodash';
import {
  Image, Modal, Button, Icon, Grid,
} from 'semantic-ui-react';
import styles from './components.module.less';

const ImageSelector = ({ eventImagesUrls, defaultImages, handleImagesUpdate }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});

  const handleSelection = (e, key, value) => {
    e.stopPropagation();
    if (selectedImages[key]) {
      setSelectedImages((imagesObj) => {
        const updatedImagesSet = _.cloneDeep(imagesObj);
        delete updatedImagesSet[key];
        return updatedImagesSet;
      });
    } else {
      setSelectedImages((imagesObj) => {
        const updatedImagesSet = _.cloneDeep(imagesObj);
        updatedImagesSet[key] = value;
        return updatedImagesSet;
      });
    }
  };

  const handleProceed = (e) => {
    e.stopPropagation();
    setSelectorVisible(false);
    const images = _.map(selectedImages, (image) => image.url);
    handleImagesUpdate(images);
  };

  return (
    <div className={styles.imageSelectorContainer}>
      <Image.Group size="small">
        {_.map(eventImagesUrls, (imageUrl) => (
          <Image src={imageUrl} className={styles.image} />
        ))}
      </Image.Group>

      <Modal
        open={selectorVisible}
        onClose={() => setSelectorVisible(false)}
        onOpen={() => setSelectorVisible(true)}
        trigger={<Button>Select Event Images</Button>}
      >
        <Modal.Header>Global Gallery</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <div className={styles.modalContent}>
              <p>
                Here are few of our favorite images :
              </p>
              <Grid columns={3} divided>
                <Grid.Row>
                  {_.map(defaultImages, (image, key) => {
                    const isImageSelected = Boolean(selectedImages[key]);
                    return (
                      <Grid.Column>
                        <div onClick={(e) => handleSelection(e, key, image)} onKeyPress={(e) => handleSelection(e, key, image)} role="button" tabIndex="0">
                          {isImageSelected
                          && (
                          <div className={styles.selectCheck}>
                            <Icon name="check circle" />
                          </div>
                          )}
                          <Image
                            src={image.url}
                            className={`${styles.imageForSelection} ${isImageSelected ? styles.selected : ''}`}
                          />
                        </div>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              </Grid>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleProceed} primary>
            Proceed
            <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ImageSelector;
