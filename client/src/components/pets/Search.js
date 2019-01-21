import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {SEARCH_PETS} from '../../quries'
import { Link } from 'react-router-dom';
import { threadId } from 'worker_threads';

// const Search = () => (
    // <Query query={SEARCH_PETS} variables={{searchParam: " "}}>
    //     {({data, loading, error}) => {
    //         if (loading) return <div>loading...</div>
    //         if (error) return <div>error...</div>
    //         console.log(data, 'search')
    //         return (
    //             <div>
    //                 <div>search</div>
    //                 <input type="search" />
    //                 <div>
    //                     {data.searchPets.map(x => <SearchItem {...x} key={x._id}/>)}
    //                 </div>
    //             </div>
    //         )
    //     }}
    // </Query>

class Search extends component {

    render() {
        return (
            <ApolloConsumer>
            {(client) => (
                <div>
                        <div>search</div>
                        <input type="search"  placeholder="search" onChange={ async (event) => {
                            event.persist();
                            const {data} = await client.query({
                                query: SEARCH_PETS,
                                variables: {searchParam: event.target.value}
                            })
                            this.handleChange(data);
                        }} />
                        <div>
                            {data.searchPets.map(x => <SearchItem {...x} key={x._id}/>)}
                        </div>
                    </div>
            )}
        </ApolloConsumer>
        )
    }
)

export default Search;


const SearchItem = (x) => (
    <Link to={`/pets/${x._id}`}>
    <div className="box">
      <span>name: {x.name} </span>
      <span>description: {x.desc} </span>
      <span>text: {x.text} </span>
      <span>category: {x.category} </span>
      <span>id: {x._id} </span>
    </div>
    </Link>
  );