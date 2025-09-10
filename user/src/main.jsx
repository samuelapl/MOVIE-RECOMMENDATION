import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient,InMemoryCache,ApolloProvider,createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { ToastProvider } from './toast/ToastContext.jsx';

const httpLink = createHttpLink({
  uri: 'https://roha-picks-back.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ApolloProvider client={client}>
      <ToastProvider>

   <App />
      </ToastProvider>
 
   </ApolloProvider>
  </StrictMode>,
)
