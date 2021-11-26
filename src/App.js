import { useEffect, useState } from 'react';
import './App.css';
import { firestore, auth} from './firestore/firebase';
import LogIn from './components/LogIn'
import ListTweets from './components/ListTweets';
import Header from './components/Header'

function App() {
  const [ tweets, setTweets ] = useState([])
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

  return (
    <div className="app-container">
      {user ? (  
        <div>
          <Header
            user={user}
          />
          <ListTweets
            tweets={tweets}
            user={user}
           />   
      </div>
      ) : (
        <LogIn />
      )}
    </div>
  );
}


export default App;
