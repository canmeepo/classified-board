import React from 'react';
import Info from './Info';
import UserPosts from './UserPosts'
// import WithAuth from '../WithAuth'

const Profile = ({session}) => {
    return (
        <div>
            <Info session={session}/>
            {console.warn(session)}
            <UserPosts username={session.getCurrentUser.username} />
        </div>
    )
}

// export default WithAuth(session => session && session.getCurrentUser)(Profile);
export default Profile;