import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useSession} from '../../context/sessioncontext';

export default function Home(){
  const history = useHistory();

  const session = useSession();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function testLocalStorage() {
    localStorage.setItem('username', 'abdel');
    localStorage.setItem('password', 'password');
    console.log('local storage username');
    console.log(localStorage.getItem('username'));
    console.log('local storage password');
    console.log(localStorage.getItem('password'));
  }

  function testInputs() {
    console.log('test input username');
    console.log(username);
    console.log('test input password');
    console.log(password);
  }

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

      <button 
        onClick={() => testLocalStorage()}
        className="page-button"
      >
        Local Storage
      </button>
      
      <button 
        onClick={() => localStorage.clear()}
        className="page-button"
      >
        Clear Local Storage
      </button>

      <div>
        <input 
          id = 'username'
          type = 'text'
          value = {username}
          onChange = {(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <input 
          id = 'password'
          type = 'password'
          value = {password}
          onChange = {(e) => setPassword(e.target.value)} />
      </div>

      <button 
        onClick={() => testInputs()}
        className="page-button"
      >
        test inputs
      </button>

    </div>
  );
};

