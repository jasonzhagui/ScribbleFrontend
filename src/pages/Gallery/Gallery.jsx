import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';


import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './gallery.css';

import LayerItem from '../../components/LayerItem/LayerItem';

import {useSession} from '../../context/sessioncontext';

export default function Gallery() {

  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(undefined);

  const [category, setCategory] = useState('');
  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');
  const [scribbles, setScribbles] = useState([[],[],[]]);

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

  useEffect(() => {
    let username = localStorage.getItem('username')
    axios.get(`${backendurl}/scribbles/${username}`)
      .then((response) => {
        if (response.data) {
          setScribbles(response.data)
          console.log(response.data)

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

  },
    [refresh])

  const session = useSession();

  const search = useLocation().search;


  return (
    <div className="content">

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

      <div className='image-center'>
        <LayerItem
          body = {body}
          head = {head}
          eyes = {eyes}
          mouth = {mouth}
          size = {500}
        />
      </div>

      <div class="flex-home-container">

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => changeScribble(0)}>
            <LayerItem
              body={scribbles[0]["body"]}
              head={scribbles[0]["head"]}
              eyes={scribbles[0]["eyes"]}
              mouth={scribbles[0]["mouth"]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => changeScribble(1)}>
            <LayerItem
              body={scribbles[1]["body"]}
              head={scribbles[1]["head"]}
              eyes={scribbles[1]["eyes"]}
              mouth={scribbles[1]["mouth"]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => changeScribble(2)}>
            <LayerItem
              body={scribbles[2]["body"]}
              head={scribbles[2]["head"]}
              eyes={scribbles[2]["eyes"]}
              mouth={scribbles[2]["mouth"]}
              size={300}
            />
          </div>

        </div>

      </div>
    </div>
  )
}
