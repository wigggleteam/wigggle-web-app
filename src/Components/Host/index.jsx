import React from 'react';
import { useRouter } from 'next/router';
import withAuthentication from '../../HOC/isAuthenticated';
import CreateEvent from './CreateEvent';

const HostSection = ({auth}) => {

  const router = useRouter();

  const { userInfo = {} } = auth;
  const roles = _.get(userInfo, 'roles', []);
  console.log('This is a host',roles.includes('HOST'));
  if(!auth.isLoggedIn || !roles.includes('HOST')){
    router.push('/');
    return (
      <h2>Redirecting to home</h2>
    )
  }

  return <CreateEvent auth={auth} />
}

const Host = withAuthentication(HostSection);

export default Host;