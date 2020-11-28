import React, { useState } from 'react';
import _ from 'lodash';
import { Grid, Input, Button, Message } from 'semantic-ui-react';
import { getAccessKeyInfo } from "../../../firebase/firestore/accessKeys";
import { updateUserRoles } from "../../../firebase/firestore/firestoreServices";
import styles from './host.module.less';

const BecomeHost = ({auth}) => {

  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    
    try {
      if(!token) return;
      const data = await getAccessKeyInfo(token);
      const {expired, roles = [] , validUsers = [] } = data;
      const { userInfo, user } = auth;
      if(!expired){
        const { uid } = user;
        const { email } = userInfo;

        const isArrayAndNotIncludeEmail = Array.isArray(validUsers) && !validUsers.includes(email);
        const isNotArrayButNotGlobal = !Array.isArray(validUsers) && validUsers !== "***global***";

        if(isArrayAndNotIncludeEmail || isNotArrayButNotGlobal){
          setError("This token is not valid for your email address");
          return;
        }

        const rolesToAdd = _.difference(roles, userInfo.roles);
        if(!rolesToAdd.length){
          setError("No new roles to add in the existing user");
          return;
        }

        const newRoles = [...userInfo.roles, ...rolesToAdd];
        updateUserRoles({uid, roles: newRoles }).then(() => {
          window.location.reload();
        });
        
      }else{
        setError("That key has already been used or expired");
        return;
      }
    }catch(e){
      console.error(e);
      setError("Something went wrong while adding role. Please contact us");
    }
  }
  
  return (
    <div className={styles.becomeHost}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <h3>Become a host</h3>
            <p>What it is becoming a host with Wigggle ?</p>
            <p>- Enjoy interaction with people who are same minded</p>
            { error && 
              <Message negative>
                <Message.Header>We're Sorry but this key is expired</Message.Header>
                <p>{ error || 'That key has already been used or expired' }</p>
              </Message>
            }
            <Input 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              icon='ticket'
              size="huge" 
              iconPosition='left' 
              placeholder='Place the token from the team' 
              fluid /> 
            <Button className={styles.verifyButton} onClick={handleVerify}> Verify Token </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default BecomeHost;