import React, {useState, useCallback} from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import Cropper from "react-cropper";
import _ from 'lodash';
import cuid from 'cuid';
import { getFileExtension } from '../../utils/functions';
import { uploadToFirebaseStorage } from '../../firebase/fireStorageService';
import { updateUserProfilePhoto } from '../../firebase/firestoreServices';

const dropZoneStyle = {
  border: '3px dashed #999',
  borderRadius: '15px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: '700',
  cursor: 'pointer',
  color: '#666',
}

const dropZoneStyleActive = _.assign({}, dropZoneStyle, {
  border: '3px solid green',
})

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const PhotoUploadModal = ({ visible, setVisible}) => {

  const [cropper, setCropper] = useState(null);
  const [file, setFile] = useState({preview: defaultSrc});
  const [image, setImage] = useState(defaultSrc);

  const onDrop = useCallback((acceptedFiles)=>{
    acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))
    setFile(acceptedFiles[0]);
  },[setFile]);

  const cropImage = () => {
    if(!cropper || typeof cropper.getCroppedCanvas() === "undefined"){
      return;
    }

    cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob)
    }, 'image/jpeg');
  }

  const handleUploadImage = () => {
    cropImage();
    console.log('Going to upload image', file.name);
    const fileName = cuid() + '.' + getFileExtension(file.name); 
    const uploadTask = uploadToFirebaseStorage(image, fileName);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log( 'uplaod is' + progress + '% done');
    }, error => {
      console.log(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        updateUserProfilePhoto(downloadURL, fileName).then(()=>{
          // setLoading(false);
        })
      })
    })
  }

  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  console.log(file);
  return(
    <Modal
        dimmer='blurring'
        size='fullscreen'
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>Profile Image</Modal.Header>
        <Modal.Content>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
            <DropZone className="container">
              <div {...getRootProps({style: isDragActive ? dropZoneStyleActive: dropZoneStyle})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </DropZone>
            </Grid.Column>
            <Grid.Column style={{position: 'relative'}}>
            <Cropper
              ref={cropper}
              style={{ height: 300, width: "100%" }}
              aspectRatio={1}
              preview=".img-preview"
              src={file.preview}
              viewMode={0}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            </Grid.Column>
            <Grid.Column>
              <PreviewContainer
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px"}}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setVisible(false)}>
            Later
          </Button>
          <Button positive onClick={handleUploadImage}>
            Update
          </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PhotoUploadModal;

const DropZone = styled.section`
  height: 300px;
  cursor: pointer;
`;

const PreviewContainer = styled.div`
  overflow: hidden;
`