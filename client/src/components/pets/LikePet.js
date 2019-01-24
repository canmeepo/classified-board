import React, { Component } from 'react';
import Session from '../Session';
import { Mutation } from 'react-apollo';
import {LIKE_PET, GET_PET, UNLIKE_PET } from '../../quries'

class LikePet extends Component {
    state = {
        username: '',
        liked: false
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const {username, favorites } = this.props.session.getCurrentUser;
            const {_id} = this.props;
            const prevLiked = favorites.findIndex(fav => fav._id === _id) > -1

            this.setState({username: username, liked: prevLiked})
        }
    }

    handleClick = (like, unlike) => {
        this.setState(prev => ({
            liked: !prev.liked,

        }),
        () => this.handleLike(like, unlike))
    }

    handleLike = (like, unlike) => {
        if (this.state.liked) {
            like().then(async ({data}) => {
                await this.props.refetch()
            })
        } else {
            unlike().then(async ({data}) => {
                await this.props.refetch()
            })
        }
     
    }

    updateLike = (cache, {data: { likePet }}) => {
        const {_id} = this.props;
        const { getPet } = cache.readQuery({query: GET_PET, variables: {_id}});

        cache.writeQuery({
            query: GET_PET,
            variables: {_id},
            data: {
                getPet: {
                    ...getPet,
                    likes: likePet.likes + 1
                }
            }
        })
    }

    updateUnlike = (cache, {data: { unlikePet }}) => {
        const {_id} = this.props;
        const { getPet } = cache.readQuery({query: GET_PET, variables: {_id}});

        cache.writeQuery({
            query: GET_PET,
            variables: {_id},
            data: {
                getPet: {
                    ...getPet,
                    likes: unlikePet.likes - 1
                }
            }
        })
    }

    render() {
        const {username, liked} = this.state;
        const {_id} = this.props;

        return (
            <Mutation mutation={UNLIKE_PET} variables={{_id, username}} update={this.updateUnlike}> 
            {(unlikePet) => 
                <Mutation mutation={LIKE_PET} variables={{_id, username}} update={this.updateLike}>
                    {(likePet) => {
                        return (
                            <div>
                            {username && <button onClick={() => this.handleClick(likePet, unlikePet)}>{liked ? 'unliked' : 'like'}</button>}
                        </div>
                        
                        )
                    }}
                </Mutation>
            }
              
            </Mutation>
        )
        
    }
}

export default Session(LikePet);