import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import 'react-native-gesture-handler';
import { API_URL } from '@env';
import { StoreProvider } from './src/store';
import Layout from './Layout';

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  // Enable sending cookies over cross-origin requests
  // credentials: 'include',
  headers: {
    authorization: 'Barrier frj slkfj dslkfjdslkfds',
    'client-name': 'TrackMyTeam',
    'client-version': '1.0.0',
  },
});

export default function App() {
  if (client) {
    return (
      <ApolloProvider client={client}>
        <StoreProvider>
          <Layout />
        </StoreProvider>
      </ApolloProvider>
    );
  } else {
    return null;
  }
}
