import { useEffect, useState } from 'react';
import './App.css';
import { firestore, loginConGoogle, auth, logout } from './firestore/firebase';




function App() {
  const [ tweets, setTweets ] = useState([])
  const [tweet, setTweet] = useState ({
    tweet: "",
    usuario: "",
    uid: "",
    mail: "",
  })
  const [user, setUser] = useState(null);

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
          uid: doc.data().uid
        };
      });
      tweets.sort(function(a, b) {
        return b.date - a.date;
      });
      setTweets(tweets);
    });

    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    })

      return () => actualizarTweet();
  }, [])


 const handleNewTweet = (e) => {
    let nuevoTweet = {
      tweet: e.target.value,
      usuario: user.displayName,
      email: user.email,
      uid: user.uid
    }
    setTweet(nuevoTweet)
 }


  const clickHandleSendTweet = (e) => {
    e.preventDefault();
    /* let tweetDate = new Date().getTime() 
    setTweet({...tweet, date: tweetDate}) */ 
    firestore.collection("tweets").add(tweet)
    setTweet({
      tweet: "",
      usuario: ""
    }
      )
  }

  const clickHandleLike = (id, likes) => {
    if(!likes) likes = 0;
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
    console.log('le di like al tweet')
  };

  const clickHandleDelete = (id) => {
    console.log(id)
    firestore.doc(`tweets/${id}`).delete()
  }

  
  return (
    <div className="app-container">
      {user ? (  
        <>
        <header>
          <nav>
            <img className="img-user" src={user.photoURL} alt="" />
            <img className="logo-devs" src="./images/Group 2.svg" alt="" />
            <img className="devs-united" src="./images/Group 1.svg" alt="" />
            <button onClick={logout}>Log out</button>
          </nav>
        </header>
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
          <div className="list-tweets">
            { tweets && tweets.map((tweet, i ) => {
              return (
                <div className="tweet" key={i}>
                  <div className="info-tweet">
                    <img className="img-user" src={user.photoURL} alt="" />
                    <p className="userName">@{tweet.usuario}</p>
                  </div>
                  <p className="tweet-content">{tweet.tweet}</p>
                  <span className="likes" onClick={ () => clickHandleLike(tweet.id, tweet.likes)}>
                    <img  src="./images/corazon.svg" alt="iamgen de corazon" />
                    <span>{tweet.likes ? tweet.likes : 0}</span>
                  </span>
                  <span className="trash" onClick={ () => clickHandleDelete(tweet.id)}>
                    <img src="./images/trash.png" alt="imagen de residuo"/>
                  </span>
                </div>
              )
            })}    
        </div>
        </main>
      </>
      ) : (
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
      )}
     
    </div>
  );
}


export default App;
