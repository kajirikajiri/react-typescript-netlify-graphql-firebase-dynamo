import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddUser from './pages/addUser'
import Root from './pages/Root'
import AddMovie from './pages/AddMovie'
import ShowUsers from './pages/ShowUsers'
import ShowMovies from './pages/ShowMovies'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`
      }
    });
  }
});

const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5) {
        nodes {
          id
          name
          url
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

client
  .query({
    query
  })
  .then(result => console.log(result));

const list= [
  <Link to="/">Root</Link>,
  <Link style={{margin: '0 5px'}} to="/AddUser">Add User</Link>,
  <Link to="/ShowUsers">Show Users</Link>,
  <Link style={{margin: '0 5px'}} to="/AddMovie">Add Movie</Link>,
  <Link to="/ShowMovies">Show Movies</Link>,
  <Route exact path="/" render={()=><Root/>}/>,
  <Route path="/AddUser" render={()=><AddUser/>}/>,
  <Route path="/AddMovie" render={()=><AddMovie/>}/>,
  <Route path="/ShowUsers" render={()=><ShowUsers/>}/>,
  <Route path="/ShowMovies" render={()=><ShowMovies/>}/>,
]

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        {list}
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
