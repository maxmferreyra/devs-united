import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import InitPage from './routes/InitPage';
import { auth } from './firestore/firebase'



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
        <Route path="/profile/*" element={<UserProfile user={user} />} />
         
      </Routes>
    </div>
  );
}

export default App;
