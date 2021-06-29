import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Auth from './components/Auth'
import Nav from './components/Nav'
import Profile from './components/profile'
import Public from './components/Public'
import { UserContext } from './context/context';
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  const {token, logOut} = useContext(UserContext)
  return (
    <div className="App">
     <Nav logout={logOut} token={token}/>
       <header className="App-header">
       <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to='profile'/> : <Auth />}
        />
        {/* <Route 
          path="/profile"
          render={() => <Profile />}
        /> */}
        <ProtectedRoute
        path='/profile'
        component={Profile}
        redirectTo='/'
        token={token} />
        <ProtectedRoute
        path='/public'
        component={Public}
        redirectTo='/'
        token={token} />
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