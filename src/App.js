import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import InitPage from './routes/InitPage';
import { auth } from './firestore/firebase'
import Favorites from "./routes/Favorites";
import Post from "./routes/Post";



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    })

  }, [])
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<InitPage user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/profile/post" element={<Post />}></Route>
        <Route path="/profile/favorites" element={<Favorites />}></Route> 
      </Routes>
    </div>
  );
}

export default App;
