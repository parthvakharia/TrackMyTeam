import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useAuthContext } from "../auth";

const GraphqlProvider = ({ children }) => {
    const { store: { token } } = useAuthContext();
    const [gqlClient, setGqlClient] = useState(undefined);

    useEffect(() => {
        if (!token) return;
        console.log(token);
        const API_URL = "http://192.168.0.110:4040";
        const client = new ApolloClient({
            uri: `${API_URL}/graphql`,
            cache: new InMemoryCache(),
            // Enable sending cookies over cross-origin requests
            // credentials: 'include',
            headers: {
                authorization: `Barrier ${token}`,
                'client-name': 'TrackMyTeam',
                'client-version': '1.0.0',
            },
        });

        setGqlClient(client);
    }, [token])

    if (!gqlClient) return <>{children}</>;

    return (
        <ApolloProvider client={gqlClient}>
            {children}
        </ApolloProvider>
    )
}

export default GraphqlProvider;