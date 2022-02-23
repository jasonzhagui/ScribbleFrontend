import React from 'react';

import './layeritem.css';

export default function LayerItem({body, head, eyes, mouth}) {
  return (
    <div className = 'parent'>

      <img class = 'body' src={body} width='500' height='500'/>
      <img class = 'head' src={head} width='500' height='500'/>
      <img class = 'eyes' src={eyes} width='500' height='500'/>
      <img class = 'mouth' src={mouth} width='500' height='500'/>
    </div>
  );
}