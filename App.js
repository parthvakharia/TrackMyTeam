import 'react-native-gesture-handler';
import React from 'react';

import { StoreProvider } from './src/store';
import Layout from './Layout';

export default function App() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
}
