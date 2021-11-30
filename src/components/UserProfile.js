import React from "react";
import {Link, Routes, Route} from 'react-router-dom';
import Post from './Post';
import Favorites from './Favorites';



const UserProfile = ({user}) => {
    
    return user && ( 
        <div className="container-profile">
            <nav>
                <button>Volver</button>
                <button>Log out</button>
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