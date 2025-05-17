import './App.css';
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Body from './components/body';



function Main() {
  return (

        <div className="App" >
          <>
            <Navbar/>
            <Sidebar/>
            <Body/>
            </>
        </div>
  );
}

export default Main;
