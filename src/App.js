import { useEffect, useState } from 'react';
import './App.css';
import { firestore, loginConGoogle, auth, logout } from './firestore/firebase';
import swal from 'sweetalert';




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
          uid: doc.data().uid,
          imagen: doc.data().imagen
        };
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

  const clickHandleLike = (id, likes) => {
    if(!likes) likes = 0;
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
    console.log('le di like al tweet')
  };

  const clickHandleDelete = (id) => {
    swal({
      title: "¿Seguro que deseas eliminarlo?",
      text: "Una vez eliminado no podrás recuperar este tweet",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Se elimino correctamente", {
          icon: "success",
        });
      } else {
        swal("Se guardo tu tweet");
      }
    });
    firestore.doc(`tweets/${id}`).delete()
  }

  
  return (
    <div className="app-container">
      {user ? (  
        <>
        <header>
          <nav>
            <img className="img-user" src={user.photoURL} alt="" />
            <div className="logo-app">
            <img className="logo-devs" src="./images/Group 2.svg" alt="" />
            <img className="devs-united" src="./images/Group 1.svg" alt="" />
            </div>
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
                    <img className="img-user" src={tweet.imagen} alt="" />
                    <p className="userName">@{tweet.usuario}</p>
                  </div>
                  <p className="tweet-content">{tweet.tweet}</p>
                  <span className="likes" onClick={ () => clickHandleLike(tweet.id, tweet.likes)}>
                    <button><img  src="./images/corazon.svg" alt="imagen de corazon" /></button>
                    <span>{tweet.likes ? tweet.likes : 0}</span>
                  </span>
                  <span className="trash" onClick={ () => clickHandleDelete(tweet.id)}>
                   <img src="./images/delete.png" alt="imagen de residuo"/>
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
