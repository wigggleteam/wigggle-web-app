import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import isnode from 'detect-node';


const RedirectToHome = () => {
  
  if(!isnode){
    const router = useRouter();
    router.push('/');
  }

  return (
    <div>
      <h1 style={{textAlign: 'center', height: '30vh'}}>Redirecting To Home</h1>
    </div>
  )
}

const withAuthentication = (WrappedComponent) => (props) => {
  const auth = useSelector(state => state.auth);
  let { isLoggedIn = false } = auth || {}; 

  if(isLoggedIn){
    return <WrappedComponent {...props} />
  }
  return <RedirectToHome />
}

export default withAuthentication;