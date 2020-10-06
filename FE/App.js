import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import 'react-native-gesture-handler';

import { StoreProvider } from './src/store';
import Layout from './Layout';


const client = new ApolloClient({
  uri: 'http://192.168.0.108:4040/graphql',
  cache: new InMemoryCache(),
  // Enable sending cookies over cross-origin requests
  // credentials: 'include',
  headers: {
    authorization: localStorage.getItem('token'),
    'client-name': 'TrackMyTeam',
    'client-version': '1.0.0',
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Layout />
      </StoreProvider>
    </ApolloProvider>
  );
}
