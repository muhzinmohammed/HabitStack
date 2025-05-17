
import Login from './components/login';
import Main from './main';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import {GoogleOAuthProvider} from '@react-oauth/google'
import {HabitContextProvider} from './context/HabitContext'
import { Navigate } from 'react-router-dom';


const App = () => {

  const CLIENT_ID = "497815148344-9dgqc58u0ch3slk0fhqdogvl08b6dvgm.apps.googleusercontent.com";
  const token = localStorage.getItem("token");
  return (
    <HabitContextProvider>
      <Router>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/main' element={<Main/>}/>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path='*' element={<App/>}/>
          </Routes>
        </GoogleOAuthProvider>
      </Router>
    </HabitContextProvider>
  );
}

export default App;
