import React from 'react';
import { Link } from 'react-router-dom';

const formDate = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const newTime = new Date(date).toLocaleTimeString();
    return `${newDate} : ${newTime}`

}

const Info = ({session}) => (
    <div>
        <div>profile</div>
        <div>username: {session.getCurrentUser.username}</div>
        <div>email: {session.getCurrentUser.email}</div>
        <div>email: {formDate(session.getCurrentUser.createdDate)}</div>

        <div>Favorites:</div>
        {session.getCurrentUser.favorites.map(x => <Link to={`/pets/${x._id}`}>
            <div className="box">
                <span>name: {x.name} </span>
                <span>id: {x._id} </span>
            </div>
        </Link>)}
        {!session.getCurrentUser.favorites.length && <div>you dont have favs</div>}
    </div>
)

export default Info; 