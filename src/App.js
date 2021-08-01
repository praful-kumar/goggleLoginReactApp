import React, {  useEffect } from 'react'
import './App.css';
// import { GoogleLogin } from 'react-google-login';
import Home from './Home'
import Search from './Search'
import axios from 'axios'
import { useHistory,  Switch, Route } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import nav from './links'
import Login from './Login'
import Logout from './Logout'


function App() {

  const history = useHistory();

  useEffect(() => {
     
    if (localStorage.getItem('token')) {
      history.push('/home')
      

    }
    else {
      history.push('/')
      
    }
  }, []);
  const responseSuccessGoogle =(response)=>{
    console.log('logged in success', response)
    axios({
      method:'POST',
      url:'http://localhost:4000/api/googlelogin',
      data:{tokenId:response.tokenId}
    }).then(response=>{
      localStorage.setItem('token', response.data.token)
      history.push('/home')
      console.log('res',response)
    })
  }
  const responsefailureGoogle =(res)=>{
    console.log('logged in fail',res)
  }


  const logOut=()=>{
    localStorage.clear();
    history.push('/')
  }
  return (
    <div className="App">
      
  <nav/>
  <Switch>
    
        <Route path='/' exact={true} >
        <Login
        responseSuccessGoogle={responseSuccessGoogle}
        responsefailureGoogle={responsefailureGoogle}
        />
        </Route>
        <Route path='/home' >
        <Home/>
        <Search/>
        <Logout
        logOut={logOut}
        />
        </Route>

        
      </Switch>
    </div>
  );
}

export default App;
