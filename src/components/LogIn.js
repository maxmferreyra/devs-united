import React from 'react';
import { loginConGoogle } from '../firestore/firebase';

const LogIn = () => {
    return(
        <div className="logInContainer">
            <img className="logo-devs-login" src="./images/Group 2.svg" alt="" />
            <img className="devs-united-login" src="./images/Group 1.svg" alt="" />
            <div>
                <p>Share your ideas!</p>
                <button onClick={loginConGoogle}>
                    <img src="./images/Google-Sign-in.png" alt="hacer login con google" />
                </button>
            </div>
        </div>
    )
}

export default LogIn;