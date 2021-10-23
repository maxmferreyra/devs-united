import { useEffect, useState } from 'react';
import './App.css';
import { firestore } from './firestore/firebase';
import Header from './Components/header/Header';



function App() {
  const [ tweets, setTweets ] = useState([])
  const [tweet, setTweet] = useState ({
    tweet: "",
    usuario: ""
  })

  const handleTweetChange = (e) => {
      setTweet({...tweet,
      tweet: e.target.value
      })
  }

  const handleUserChange = (e) => {
    setTweet({...tweet,
      usuario: e.target.value
      })  
  }

  const sendTweet = () => {
   let enviarTweet = firestore.collection("tweets").add(tweet)
   let solicitarDocumento = enviarTweet.then(docRef => docRef.get())

    solicitarDocumento.then(doc => {
      const nuevoTweet = {
        tweet: doc.data().tweet,
        usuario: doc.data().usuario,
        id: doc.id
      }

      setTweets(...tweets, nuevoTweet)
    })
  }

  useEffect(() => {
    firestore
    .collection('tweets')
    .get()
    .then(snapshot => {
      const tweets = snapshot.docs.map((doc) => {
        return {
          tweet: doc.data().tweet,
          usuario: doc.data().usuario,
          date: doc.data().date,
          id: doc.id
        };
      });
      setTweets(tweets);
    })
  }, [])


  return (
    <div className="app-container">
      <Header />
      <main>
        <form className="new-tweet">
          <div className="write-tweet">
            <img className="img-user" src="./images/user.png" alt="" />
            <textarea name="" id="" cols="30" rows="10" value={tweet.tweet} onChange={handleTweetChange}>What's happening?</textarea>
          </div>
          <div>
            <input type="text" placeholder="Usuario" value={tweet.usuario} onChange={handleUserChange}/>
            <button onClick={sendTweet}>ENVIAR</button>
          </div>
        </form>

        <section className="list-tweets">
          
            {tweets.map((tweet, i ) => {
              return (
                <div className="tweet" key={i}>
                  <img className="img-user" src="./images/user.png" alt="" />
                  <div className="info-tweet">
                    <p className="userName">@{tweet.usuario} <span>- {tweet.date}</span></p>
                    <p className="tweet-content">{tweet.tweet}</p>
                  </div>
                  <span className="info-likes">15</span>
                  <img className="heart" src="./images/corazon.svg" alt="" />
                </div>
              )
            })}    
        </section>
      </main>
    </div>
  );
}


export default App;
