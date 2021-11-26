import React from 'react';
import { useState } from 'react';
import { firestore } from '../firestore/firebase';

const NewTweet = ({user}) => {
    const [tweet, setTweet] = useState ({
        tweet: "",
        usuario: "",
        uid: "",
        mail: "",
      })

    const handleNewTweet = (e) => {
        let nuevoTweet = {
          tweet: e.target.value,
          usuario: user.displayName,
          email: user.email,
          uid: user.uid,
          imagen: user.photoURL
        }
        setTweet(nuevoTweet)
     }
    
      const clickHandleSendTweet = (e) => {
        e.preventDefault();
        /* let tweetDate = new Date().getTime() 
        setTweet({...tweet, date: tweetDate}) */  
           firestore.collection("tweets").add(tweet)
           setTweet({
             tweet: ""
           })
      }

    return(
        <main>
        <form className="new-tweet">
            <textarea 
                name="tweet" 
                id="" 
                cols="30" 
                rows="10" 
                maxLength="120" 
                value={tweet.tweet} 
                onChange={handleNewTweet} 
                placeholder="Que estas pensando?">                
            </textarea>
            <button onClick={clickHandleSendTweet}>Publicar</button> 
        </form>
    </main>
    )
}

export default NewTweet;

