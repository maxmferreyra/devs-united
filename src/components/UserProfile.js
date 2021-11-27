import React from "react";

const UserProfile = ({user}) => {
    return (
        <div>
            <nav>
                <button>volver</button>
                <button>logout</button>
            </nav>
            <div>
            <img className="img-user" src={user.photoURL} alt="" />
                <button>POST</button>
                <button>FAVORITES</button>
            </div> 
        </div>
    )
}

export default UserProfile;