import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {backendurl} from '../../config';

import {useSession} from '../../context/sessioncontext';

export default function Home(){
  const history = useHistory();

  const session = useSession();

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if(localStorage.getItem('username')){
      setLogged(true);
    }
  })

  const handleLogin = () => {
    axios.get(`${backendurl}/user/${username}/${password}`)
      .then((response) => {
        if (response.data){
          console.log(response.data);
          console.log("username: ",username);
          console.log("password: ", password);
          localStorage.setItem('username', username); 
          localStorage.setItem('password', password);
          setLogged(!logged);
        }
      })
  }

  function navigateToPage(path) {
    history.push(path);
  }

  function clear() {
    localStorage.clear();
    setUsername('');
    setPassword('');
    setLogged(!logged);
  }

  return (
    <div className="content">
      <h1>🤗 Scribble</h1>
      <div>
        <h2>Make Scribble Art</h2>
      </div>
      <button
        onClick={() => navigateToPage('/layers')}
        className="page-button"
      >
        Draw a Scribble
      </button> 
      <button
        onClick={() => navigateToPage('/gallery')}
        className="page-button"
      >
        View my Gallery
      </button> 

      {!logged &&
        <>
          <div>
            <label for = 'username'> Username: </label>
            <input 
              id = 'username'
              type = 'text'
              value = {username}
              onChange = {(e) => setUsername(e.target.value)} />
          </div>

          <div>
          <label for = 'password'> Password: </label>
            <input 
              id = 'password'
              type = 'password'
              value = {password}
              onChange = {(e) => setPassword(e.target.value)} />
          </div>

          <button 
            onClick={() => {
              handleLogin();
            }}
            className="page-button"
          >
            Login
          </button>

        </>
      }

      {logged && 
        <button 
          onClick={() => clear()}
          className="page-button"
        >
          Logout
        </button>
      }
      

    </div>
  );
};

