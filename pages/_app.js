import { ApolloProvider } from "@apollo/client";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { client } from "../lib/apolloConn";

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}
