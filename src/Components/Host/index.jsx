import React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import withAuthentication from '../../HOC/isAuthenticated';
import CreateEvent from './CreateEvent';

const HostSection = (props) => {
  const router = useRouter();

  const { auth } = props;
  const { userInfo = {} } = auth;
  const roles = _.get(userInfo, 'roles', []);

  if (!auth.isLoggedIn || !roles.includes('HOST')) {
    router.push('/');
    return (
      <div {...props}>
        <h2>Redirecting to home</h2>
      </div>
    );
  }

  return <CreateEvent {...props} />;
};

const HostView = withAuthentication(HostSection);

export default HostView;
