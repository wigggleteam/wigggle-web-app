import React from 'react';
import { useRouter } from 'next/router';
import withAuthentication from '../../HOC/isAuthenticated';
import Home from './Home';

const HostSection = (props) => {

  const router = useRouter();

  const { userInfo = {} } = props.auth;
  const roles = _.get(userInfo, 'roles', []);
  console.log('This is a host',roles.includes('WIGGGLE_ADMIN'));
  if(!props.auth.isLoggedIn || !roles.includes('WIGGGLE_ADMIN')){
    router.push('/');
    return (
      <div {...props}>
        <h2>Redirecting to home</h2>
      </div>
    )
  }

  return <Home {...props}/>
}

const HostView = withAuthentication(HostSection);

export default HostView;