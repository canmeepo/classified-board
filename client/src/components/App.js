import React, { Component } from 'react';
import './App.css';
import { Query} from 'react-apollo';
import {GET_ALL_PETS} from '../quries'

const App = () => (
  <div className="App">
    <Query query={GET_ALL_PETS}>
      {({data, loading, error}) => {
        if (loading) return <div>loading...</div>
        if (error) return <div>error...</div>
        console.log(data)
        return (
          <div>{data.getAllPets.map((x,i)=> <div key={i}>
            <span>name: {x.name} </span>
            <span>description: {x.desc} </span>
            <span>text: {x.text} </span>
            <span>category: {x.category} </span>
            </div>)}</div>
        )
      }}
    </Query>
  </div>
)

export default App;
