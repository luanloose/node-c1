import { Box } from '@material-ui/core';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useStores } from '../hooks/useStores';

import routes from './routerList';

const Router: React.FC = () => {
  const { authenticationStore } = useStores();

  const routing = useRoutes(routes(authenticationStore.isAuthenticated));

  return (
    <Box>
      {routing}
    </ Box>
  );
};

export default Router;