import React from 'react';
import 'react-native-gesture-handler';
// import { API_URL } from '@env';
import Layout from './Layout';
import AuthProvider from './src/provider/auth';
import GraphqlProvider from './src/provider/graphql';

export default function App() {
  return (
    <AuthProvider>
      <GraphqlProvider>
        <Layout />
      </GraphqlProvider>
    </AuthProvider>
  );
}
