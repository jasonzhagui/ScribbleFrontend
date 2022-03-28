import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useSession} from '../../context/sessioncontext';

export default function Home(){
  const history = useHistory();

  const session = useSession();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function navigateToPage(path) {
    history.push(path);
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
        onClick={() => {localStorage.setItem('username', username); 
          localStorage.setItem('password', password);}}
        className="page-button"
      >
        Login
      </button>

      <button 
        onClick={() => localStorage.clear()}
        className="page-button"
      >
        Logout
      </button>

    </div>
  );
};

