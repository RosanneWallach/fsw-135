import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Auth from './components/Auth'
import Nav from './components/Nav'
import Profile from './components/profile'
import { UserContext } from './context/context';

function App() {

  const {token, logOut} = useContext(UserContext)
  return (
    <div className="App">
      <Nav/>
       <header className="App-header">
       <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to='profile'/> : <Auth />}
        />
        <Route 
          path="/profile"
          render={() => <Profile />}
        />
        {/* <Route 
          path="/public"
          render={() => <Public />}
        /> */}
      </Switch>
      </header>
    </div>
  );
}

export default App;