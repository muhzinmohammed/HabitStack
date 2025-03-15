import './App.css';
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Body from './components/body';
import {HabitContextProvider} from './context/HabitContext'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Marked from './components/marked';

function App() {
  return (
      <HabitContextProvider>
      <Router>
        <div className="App">
          <>
            <Navbar/>
            <Sidebar/>
              <div className='main'>
                <Routes>
                  <Route path='/' element={<Body/>}/>
                  <Route path='/marked' element={<Marked/>} />
                </Routes>
              </div>
            </>
        </div>
    </Router>
    </HabitContextProvider>
  );
}

export default App;
