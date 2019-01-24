import React from 'react';
import Info from './Info';
import UserPosts from './UserPosts';
import withAuth from '../withAuth';

const Profile = ({session}) => {
    return (
        <div>
            <Info session={session}/>
            <UserPosts username={session.getCurrentUser.username} />
        </div>
    )
}

export default withAuth(session => session.data && session.data.getCurrentUser)(Profile);
