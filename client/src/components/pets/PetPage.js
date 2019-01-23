import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_PET } from '../../quries'
 
const PetPage = ({match}) => {
    const {_id} = match.params;
    console.warn(_id)
    return (
        <Query query={GET_PET} variables={{_id}}>
            {({data, loading, error}) => {
                if (loading) return <div>loading...</div>
                if (error) return <div>error...</div>
                console.warn()
                return (
                    <div className="box"> 
                        {console.log(data.getPet, 'pet page')}
                        <span>name: {data.getPet.name} </span>
                        <span>description: {data.getPet.desc} </span>
                        <span>text: {data.getPet.text} </span>
                        <span>category: {data.getPet.category} </span>
                        <span>id: {data.getPet._id} </span>
                        <span>username: {data.getPet.username} </span>
                    </div>
                )
            }}
            </Query>
    )
}

export default withRouter(PetPage);