import React from 'react';

import './layeritem.css';

export default function LayerItem({body, head, eyes, mouth, size}) {
  return (
    <div className = 'parent'>

      <img class = 'body' src={body} width={size} height={size} alt=""/>
      <img class = 'head' src={head} width={size} height={size} alt=""/>
      <img class = 'eyes' src={eyes} width={size} height={size} alt=""/>
      <img class = 'mouth' src={mouth} width={size} height={size} alt=""/>
    </div>
  );
}