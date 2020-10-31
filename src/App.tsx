import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5, isFork: false) {
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
`;

interface Data {
  organization: {
    repositories: {
      nodes: {
        id:string,name:string,url:string,viewerHasStarred:string,stargazers:{
          totalCount:string
        }
      }[]
    }
  }
}

interface Variables {
  first: number,
  isFork: boolean
}

function App() {
  return (
    <Query<Data,Variables> query={query}>
      {({loading, error, data})=>{
        if (loading) return <p>lOaDiNg...</p>
        if (!data) return <p>data not found</p>

        const repositories = data.organization.repositories.nodes

        return (
          <ul>
            {repositories.map((repo:{url:string,id:string,name:string,stargazers:{totalCount:string}})=>(
              <li key={repo.id}>
                <a href={repo.url}>{repo.name}</a>
                <button>{repo.stargazers.totalCount} Star</button>
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  );
}

export default App;
