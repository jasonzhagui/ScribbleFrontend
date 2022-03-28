import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useSession} from '../../context/sessioncontext';

export default function Home(){
  const history = useHistory();

  const session = useSession();

  function testLocalStorage() {
    localStorage.setItem('username', 'abdel');
    localStorage.setItem('password', 'password');
    console.log('username');
    console.log(localStorage.getItem('username'));
    console.log('password');
    console.log(localStorage.getItem('password'));
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

    </div>
  );
};

