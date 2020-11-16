import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/router';

const Loading = ({loading}) => {
  const router = useRouter();

  if(!loading){
    router.push('/');
  }

  if(loading){
    return (
      <div style={{position: 'absolute', top: '150px', left: '49vw'}}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{textAlign: 'center', height: '30vh'}}>Redirecting To Home</h1>
    </div>
  )
}

const withAuthentication = (WrappedComponent) => (props) => {
  const auth = useSelector(state => state.auth);
  console.log("From the selector", auth)
  let { isLoggedIn = false, loading } = auth || {};

  if(isLoggedIn){
    return <WrappedComponent {...props} auth={auth} />
  }
  return <Loading loading={loading} />
}

export default withAuthentication;