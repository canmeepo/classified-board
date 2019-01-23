import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER_POSTS } from '../../quries';
import { Link } from 'react-router-dom';

const UserPosts = ({username}) => {

    return (
    <Query query={GET_USER_POSTS} variables={{username}}>
        {(data, loading, error ) => {
            if (loading) return <div>loading...</div>
            if (error) return <div>error...</div>
            const {getUserPosts} = data;
            let arr = [];
            if(data && getUserPosts) {
                arr = data
            }
            console.log(data)
            return (
                <div>
                    <h3>your posts</h3>
                    <UserPostItem {...data}/>
                </div>
            )
        }}
    </ Query>
    )
}

export default UserPosts;


const UserPostItem = ({data}) => (
    <div>
        {data.getUserPosts && data.getUserPosts.map(x => (
            <Link key={x._id} to={`/pets/${x._id}`}>
                <div className="box">
                <span>name: {x.name} </span>
                <span>id: {x._id} </span>
                </div>
            </Link>
        ))}
    </div>
);