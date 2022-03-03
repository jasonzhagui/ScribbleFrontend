import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Home(){
  const history = useHistory();

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
        View All Layers
      </button> 
    </div>
  );
};

