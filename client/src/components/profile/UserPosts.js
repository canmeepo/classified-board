import React from 'react';
import { Query , Mutation} from 'react-apollo';
import { GET_USER_POSTS, DELETE_USER_POST, GET_ALL_PETS, GET_CURRENT_USER } from '../../quries';
import { Link } from 'react-router-dom';

const UserPosts = ({username}) => {

    return (
    <Query query={GET_USER_POSTS} variables={{username}}>
        {(data, loading, error ) => {
            if (loading) return <div>loading...</div>
            if (error) return <div>error...</div>

            return (
                <div>
                    <h3>your posts</h3>
                    <UserPostItem {...data} {...{username}}/>
                </div>
            )
        }}
    </ Query>
    )
}

export default UserPosts;


const UserPostItem = ({data, username}, ) => (
   
    <div>
        {data.getUserPosts && !data.getUserPosts.length && <div>you don't have posts</div>}
        {data.getUserPosts && data.getUserPosts.map(x => (
            <div key={x._id}>
                <Link  to={`/pets/${x._id}`}>
                    <div className="box">
                    <span>name: {x.name} </span>
                    <span>id: {x._id} </span>
                    <span>likes</span>
                    </div>
                </Link>
                <Mutation 
                    mutation={DELETE_USER_POST} 
                    variables={{_id: x._id}}
                    refetchQueries={() => [
                        {query: GET_ALL_PETS},
                        {query: GET_CURRENT_USER}
                    ]} 
                    update={(cache, {data: { deleteUserPost}}) => {
                     const {getUserPosts} = cache.readQuery({
                         query: GET_USER_POSTS,
                         variables: {username}
                     })

                     cache.writeQuery({
                         query: GET_USER_POSTS,
                         variables: {username},
                         data: {
                             getUserPosts: getUserPosts.filter(x => x._id !== deleteUserPost._id)
                         }
                     })
                    }}
                >
                    {(deleteUserPost,attrs = {}) => {
                        return (
                            <div>
                                <button>update</button>
                                <button onClick={() => handleDelete(deleteUserPost)}>{attrs.loading ? 'deleting...' : 'delete'}</button>
                            </div>
                        )
                    }}
                </ Mutation>
            </div>
        ))}
    </div>
);

const handleDelete = (deleteUserPost) => {
    deleteUserPost().then(({data}) => {
    });
}