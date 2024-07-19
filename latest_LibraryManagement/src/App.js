import './App.css';
import { BrowserRouter as  Router,Route, Routes } from 'react-router-dom';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/Navbar';
import Home from './components/Home';
import City from './components/Lists/City';
import About from './components/About';
import Contact from './components/Contact';
import Library from './components/Lists/Library';
import Books from './components/Lists/Books';
import AddCity from './components/Main_Form/AddCity';
import AddLibrary from './components/Main_Form/AddLibrary';
import AddBooks from './components/Main_Form/AddBooks';
import AddUser from './components/Main_Form/AddUser';
import BookIssue from './components/Main_Form/BookIssue';
import UserIssueBooks from './components/Lists/UserIssueBooks';
import Users from './components/Lists/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchUsers from './components/Lists/SearchUsers';
import Footer from './components/inc/Footer';


function App() {
  return (
    <div className="App">
      <Router> 
     <NavBar></NavBar>
     <Routes>
     <Route exact path="/" Component={Home}></Route>
     <Route exact path="/City" Component={City}></Route>
     <Route exact path="/About" Component={About}></Route>
     <Route exact path="/Contact" Component={Contact}></Route>
     <Route exact path="/Library" Component={Library}></Route>
     <Route exact path="/Books" Component={Books}></Route>
     <Route exact path="/AddCity" Component={AddCity}></Route>
     <Route exact path="/AddLibrary" Component={AddLibrary}></Route>
     <Route exact path="/AddBooks" Component={AddBooks}></Route>
     <Route exact path="/AddUser" Component={AddUser}></Route>
     <Route exact path="/BookIssue" Component={BookIssue}></Route>
     <Route exact path="/UserIssueBooks" Component={UserIssueBooks}></Route>
     <Route exact path="/Users" Component={Users}></Route>
     <Route exact path="/SearchUsers" Component={SearchUsers}></Route>


     </Routes>
      {/* <Footer/> */}
     </Router>
    <ToastContainer/>
    </div>
  );
}

export default App;
