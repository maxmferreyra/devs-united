import React from "react";
import {Link, Routes, Route} from 'react-router-dom';
import Post from './Post';
import Favorites from './Favorites';
import { logout } from '../firestore/firebase';



const UserProfile = ({user}) => {
    
    return user && ( 
        <div className="container-profile">
            <nav>
                <Link to="/"><button>Volver</button></Link> 
                <Link to="/"><button onClick={logout}>Log out</button></Link>
            </nav>
            <img className="img-user" src={user.photoURL} alt="" />          
            <div className="tweets-profile">
                <Link to="/profile/post"><button>POST</button></Link>
                <Link to="/profile/favorites"><button>FAVORITES</button></Link>  
            </div> 
            <Routes>
                <Route path="/post" element={<Post />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
            </Routes>    
        </div>
        )
}

export default UserProfile;