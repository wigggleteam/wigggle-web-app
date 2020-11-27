import React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import BecomeHost from './BecomeHost';
import Host from './Host';

const HostSection = ({auth}) => {
  const { isLoggedIn, userInfo } = auth;
  const router = useRouter();

  if(!isLoggedIn){
    router.push('/');
  }

  const roles = _.get(userInfo, 'roles', ['USER']);

  if(!roles.includes('HOST')){
    return (
      <BecomeHost auth={auth}/>
    )
  }

  return (
    <Host />
  )
}

export default HostSection;