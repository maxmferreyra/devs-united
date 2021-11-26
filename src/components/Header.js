import React from 'react';
import { logout } from '../firestore/firebase';
import NewTweet from './NewTweet';
import { Link } from "react-router-dom"

const Header = ({user}) => {

    const clickUserProfile = () => {
        <Link to="/UserProfile"></Link>
    }

    return(
        <div>
            <header>
                <nav>
                    <img onClick={clickUserProfile} className="img-user" src={user.photoURL} alt="" />
                    <div className="logo-app">
                        <img className="logo-devs" src="./images/Group 2.svg" alt="" />
                        <img className="devs-united" src="./images/Group 1.svg" alt="" />
                    </div>
                    <button onClick={logout}>Log out</button>
                </nav>
            </header>
            <NewTweet 
            user={user}
            />
        </div>
    )
}

export default Header;