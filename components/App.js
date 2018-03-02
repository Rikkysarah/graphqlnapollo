import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});


const MY_QUERY = gql`query { todos { text } }`;
const MyComponentWithData = graphql(MY_QUERY)(props => <div>...</div>);

function TodoApp({ data: { todos } }) {
    return (
      <ul>
        {todos.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    );
  }
  
  export default graphql(gql`
    query TodoAppQuery {
      todos {
        id
        text
      }
    }
  `)(TodoApp);

ReactDOM.render(
    <ApolloProvider client={client}>
      <MyAppComponent />
    </ApolloProvider>,
    document.getElementById('root')
  )