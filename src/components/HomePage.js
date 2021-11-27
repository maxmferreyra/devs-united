import React from 'react';
import { useEffect, useState } from 'react';
import { logout,  firestore} from '../firestore/firebase';



import ListTweets from './ListTweets';
import NewTweet from './NewTweet';
import { Link } from 'react-router-dom';


const HomePage = ({user}) => {
    
    const [ tweets, setTweets ] = useState([])

    useEffect(() => {
        const actualizarTweet = firestore
        .collection('tweets')
        .onSnapshot((snapshot) => {
          const tweets = snapshot.docs.map((doc) => {
            return {
              tweet: doc.data().tweet,
              usuario: doc.data().usuario,
              likes: doc.data().likes,
              id: doc.id,
              email: doc.data().email,
              uid: doc.data().uid,
              imagen: doc.data().imagen
            };
          }); 
          setTweets(tweets);
        });
    
    
        return () => actualizarTweet();
      }, [])

    return (
        <>
        
        <header>
            <nav>
                    <Link to="/profile"> <img className="img-user" src={user.photoURL} alt="" /> </Link>             
                    <div className="logo-app">
                        <img className="logo-devs" src="./images/Group 2.svg" alt="" />
                        <img className="devs-united" src="./images/Group 1.svg" alt="" />
                    </div>
                    <button onClick={logout}>Log out</button>   
            </nav>
        </header>
        
            <NewTweet user={user}/>
            <ListTweets 
            user={user}
            tweets={tweets}
             />
        
        </>
    )
}

export default HomePage;