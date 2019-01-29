import React from 'react';
import './App.css';
import { Query} from 'react-apollo';
import {GET_ALL_PETS} from '../quries'
import { Link } from 'react-router-dom';

const App = () => (
  <div className="App">
    <h2>pets</h2>
    <Query query={GET_ALL_PETS}>
      {({data, loading, error}) => {
        if (loading) return <div>loading...</div>
        if (error) return <div>error...</div>

        return (
          <div >{data.getAllPets.map((x,i)=> <PetItem {...x} key={x._id}/>)}</div>
        )
      }}
    </Query>
  </div>
)

export default App;


const PetItem = (x) => (
  <Link to={`/pets/${x._id}`}>
  <div className="box" style={{background: `url(${x.imageUrl})`}}>
    <span>name: {x.name} </span>
    <span>description: {x.desc} </span>
    <span>text: {x.text} </span>
    <span>category: {x.category} </span>
    <span>id: {x._id} </span>
  </div>
  </Link>
);