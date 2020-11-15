import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/router';

const Loading = () => {
  const router = useRouter();

  return (
    <div style={{position: 'absolute', top: '150px', left: '49vw'}}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
    </div>
  )
}

const withAuthentication = (WrappedComponent) => (props) => {
  const auth = useSelector(state => state.auth);
  console.log("From the selector", auth)
  let { isLoggedIn = false } = auth || {};

  if(isLoggedIn){
    return <WrappedComponent {...props} auth={auth} />
  }
  return <Loading />
}

export default withAuthentication;