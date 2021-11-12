import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
axios.defaults.baseURL = "https://us-central1-leetcode-90738.cloudfunctions.net/api";
function App() {
  return (
    <div>
      <Login/>
      <Router>
        <div>
        <Navbar/>
            <div>
              <Switch>
                <Route exact path = "/CS321-Leetcode-Ext" component = {Home}/>
                <Route name = "login" exact path = "/login/:open" component = {Login}/>
                <Route exact path = "/signup/:open" component = {SignUp}/>
              </Switch>
            </div>
        </div>
        </Router>
    </div>
  );
}

export default App;
