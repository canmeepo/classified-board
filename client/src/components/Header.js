import React from 'react';
import { Link } from 'react-router-dom';
import Signout from './auth/Signout'

const Header = ({session}) => (
    <div>
        {session && session.getCurrentUser ? <HeaderUser /> : <HeaderAnnon />}
    </div>
)


const HeaderUser = () => (
    <div>
        <Link to="/" exact="true">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/pets/add">Add pet</Link>
        <Link to="/profile">Profile</Link>
        <Signout />
    </div>
)

const HeaderAnnon = () => (
    <div>
        <Link to="/" exact="true">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
    </div>
)

export default Header;