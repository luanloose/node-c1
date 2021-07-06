import React from 'react';
import { storesContext } from '../stores/storeInitializer';

export const useStores = () => React.useContext(storesContext);