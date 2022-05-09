import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './gallery.css';

import LayerItem from '../../components/LayerItem/LayerItem';

export default function Gallery() {
  const history = useHistory();

  const [scribbles, setScribbles] = useState([]);
  const [logged, setLogged] = useState(false);

  const [body, setBody] = useState('');
  const [head, setHead] = useState('');
  const [eyes, setEyes] = useState('');
  const [mouth, setMouth] = useState('');

  function changeScribble(index){
    setBody(scribbles[index]['body']);
    setHead(scribbles[index]['head']);
    setEyes(scribbles[index]['eyes']);
    setMouth(scribbles[index]['mouth']); 

  }
  const search = useLocation().search;

  useEffect(() => {
    let username = localStorage.getItem('username')
    if (username)
    axios.get(`${backendurl}/scribbles/${username}`)
      .then((response) => {
        if (response.data) {
          setScribbles(response.data)
          setLogged(true);

          let newBody = new URLSearchParams(search).get('body');
          let newHead = new URLSearchParams(search).get('head');
          let newEyes = new URLSearchParams(search).get('eyes');
          let newMouth = new URLSearchParams(search).get('mouth');

          if (!newBody){

            setBody(response.data[0]['body']);
            setHead(response.data[0]['head']);
            setEyes(response.data[0]['eyes']);
            setMouth(response.data[0]['mouth']); 

          } else{
            setBody(newBody)
            setHead(newHead)
            setEyes(newEyes)
            setMouth(newMouth)
            
          }
        }
      })
  },[search])

  const scribblesScroll = scribbles.map((scribble, index) => {
    return {
      id: index,
      body: scribble['body'],
      head: scribble["head"],
      eyes: scribble["eyes"],
      mouth: scribble["mouth"]
    }
  });

  function navigateToPage(path) {
    history.push(path);
  }



  return (
    <div className="content-gallery">

      <div className="layers-header">
        <PageTitle
          text="My Gallery"
        />
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {logged && (scribbles.length!=0) &&
      <>
      <div className='image-center'>
        <LayerItem
          body = {body}
          head = {head}
          eyes = {eyes}
          mouth = {mouth}
          size = {500}
        />
      </div>

      <div class="flex-gallery-container-scroll">

        {scribblesScroll.map((scribble) => {

            return <div class="flex-gallery-item-right">
                      <div className='image-gallery-center ' onClick={e => changeScribble(scribble.id)}>
                        <LayerItem
                          body={scribble.body}
                          head={scribble.head}
                          eyes={scribble.eyes}
                          mouth={scribble.mouth}
                          size={300}
                        />
                      </div>
                  </div>

        })}

        </div>
        </>
      }

      {logged && (scribbles.length==0) &&
      <>
        <h2>Seems like you haven't created any Scribbles yet!</h2>
        <button onClick={() => navigateToPage('/layers')} className="page-home-button"> Draw a Scribble </button>
      </>
      }

      {!logged &&
      <>
        <h2>Seems like you're not logged in!</h2>
        <button onClick={() => navigateToPage('/SignIn')} className="page-home-button"> Sign in</button>
      </>
      }

    </div>
  )
}
