import React from "react";
import {Link} from 'react-router-dom';



const UserProfile = ({user}) => {
    return (
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
            
                     
        </div>
    )
}

export default UserProfile;