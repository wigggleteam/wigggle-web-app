import React, {useState, useCallback} from 'react';
import { Grid, Button, Modal, Message, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import Cropper from "react-cropper";
import _ from 'lodash';
import cuid from 'cuid';
import { getFileExtension } from '../../utils/functions';
import { uploadToFirebaseStorage } from '../../firebase/fireStorageService';
import { updateUserProfilePhoto } from '../../firebase/firestore/firestoreServices';

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


const ErrorWithImage = () => (
    <Message negative>
      <Message.Header>Oops! There is an issue with this file.</Message.Header>
      <p>You can only upload png/jpeg files under 5MB.</p>
    </Message>
)

const PhotoUploadModal = ({ visible, setVisible}) => {

  const dispatch = useDispatch();
  const [cropper, setCropper] = useState(null);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onDrop = useCallback((acceptedFiles)=>{  
    const fileReceived = acceptedFiles[0];
    if(fileReceived){
      const { type, size } = fileReceived;
      if((type === "image/png" || type === "image/jpeg" || type === "image/jpg" ) && size < 10 * 1024 * 1024 * 1000){
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
        setFile(acceptedFiles[0]);
      }else{
        setError(true);
        setTimeout(()=>setError(false),5000);
      }
    }
  },[setFile]);

  const cropImage = () => {
    return new Promise(resolve => {
      if(!cropper || typeof cropper.getCroppedCanvas() === "undefined"){
        throw new Error('Cropper is not available');
      }

      cropper.getCroppedCanvas().toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg');
    });
  };

  const handleUploadImage = async() => {
    setLoading(true);
    const image = await cropImage();
    console.log('Going to upload image', file.name);
    const fileName = cuid() + '.' + 'jpeg'; // getFileExtension(file.name); 
    console.log(`Uploading file name: ${fileName}`);
    const uploadTask = uploadToFirebaseStorage(image, fileName);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log( 'Upload is at' + progress + '% done');
    }, error => {
      console.log(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log("This is the download URL", downloadURL);
        updateUserProfilePhoto(downloadURL, fileName).then(()=>{
          console.log("Updated user profile photo")
          setLoading(false);
          setVisible(false);
          dispatch({type: 'VERIFY_LOGIN'});
        })
      })
    })
  }

  const handleModalClose = () => {
    setFile();
    setVisible(false);
  }

  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  console.log(file);
  return(
    <Modal
        dimmer='blurring'
        size='large'
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>Profile Image</Modal.Header>
        <Modal.Content>
          <Dimmer active={loading} inverted>
            <Loader inverted content="Uploading Image. Please wait.." />
          </Dimmer>
            {!file &&
            <Grid columns={1} divided>
              <Grid.Row>
              <Grid.Column>
                {error && <ErrorWithImage />}
                <DropZone className="container">
                  <div {...getRootProps({style: isDragActive ? dropZoneStyleActive: dropZoneStyle})}>
                    <input {...getInputProps()} accept="image/png|image/jpg|image/jpeg" />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </DropZone>
                </Grid.Column>
                </Grid.Row>
              </Grid>
            }
            {file && 
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                    <h5>Please crop your profile image below :</h5>
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
                  <Grid.Column width={6}>
                    <h5>Preview of Profile Image</h5>
                    <PreviewContainer
                    className="img-preview"
                    style={{ width: "100%", float: "left", height: "300px"}}
                    />
                  </Grid.Column>
              </Grid.Row>
            </Grid>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleModalClose}>
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