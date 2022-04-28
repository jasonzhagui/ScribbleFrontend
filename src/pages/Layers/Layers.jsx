import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import Select from 'react-select';

import PageTitle from '../../components/PageTitle/PageTitle';
import { backendurl } from '../../config';

import './layers.css';
import LayerItem from '../../components/LayerItem/LayerItem';

import { useSession } from '../../context/sessioncontext';

export default function Layers() {

  const [error, setError] = useState(undefined);

  const [body, setBody] = useState(undefined);
  const [head, setHead] = useState(undefined);
  const [eyes, setEyes] = useState(undefined);
  const [mouth, setMouth] = useState(undefined);

  const [dropdown, setDropdown] = useState([]);
  const [layers, setLayers] = useState([]);

  const [refresh, setRefresh] = useState(undefined);

  //const [scribble, setScribble] = useState([]);
  const scribble = [body, head, eyes, mouth];

  const history = useHistory();

  const refreshPage = () => {
    window.location.reload();
  }

  function navigateToPage(path) {
    history.push(path);
  }

  const session = useSession();

  const search = useLocation().search;

  useEffect(() => {
    axios.get(`${backendurl}/layers/dropdownList`)
      .then((response) => {
        if (response.data) {

          setDropdown(response.data)
        }
      })

    axios.get(`${backendurl}/layers/list`)
      .then((response) => {
        if (response.data) {
          setLayers(response.data)

          let newBody = new URLSearchParams(search).get('body');
          let newHead = new URLSearchParams(search).get('head');
          let newEyes = new URLSearchParams(search).get('eyes');
          let newMouth = new URLSearchParams(search).get('mouth');
        
          
          if (!newBody){

            let bodyValues = Object.values(response.data[0])
            setBody(bodyValues[Math.floor(Math.random() * bodyValues.length)]);
            let headValues = Object.values(response.data[1])
            setHead(headValues[Math.floor(Math.random() * headValues.length)]);
            let eyesValues = Object.values(response.data[2])
            setEyes(eyesValues[Math.floor(Math.random() * eyesValues.length)]);
            let mouthValues = Object.values(response.data[3])
            setMouth(mouthValues[Math.floor(Math.random() * mouthValues.length)]);

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

  const handleCreateScribble = () => {
    var newLayers = {}
    for (var doc in layers){
      for (var item in layers[doc]){
        newLayers[layers[doc][item]] = item;
      }
    }

    var username = localStorage.getItem('username');
    axios.post(`${backendurl}scribbles/create/${username}/${newLayers[scribble[0]]}/${newLayers[scribble[1]]}/${newLayers[scribble[2]]}/${newLayers[scribble[3]]}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      })
  }

  

  return (
    <div className="content">

      <div className="layers-header">
        <PageTitle
          text="Draw a Scribble"
        />
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {error && (
        <div className="layers-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div class="flex-container">

        <div class="flex-item-right">
          <div className='image-center'>
            <LayerItem
              body={body}
              head={head}
              eyes={eyes}
              mouth={mouth}
              size={500}
            />
          </div>
        </div>
        <div class="flex-item-left">
          <div className="page-dropdown">
            <h2>Body:</h2>
            <Select
              isSearchable={false}
              placeholder='Choose a body'
              options={dropdown[0]}
              onChange={(e) => { setBody(e.value) }}
            />
          </div>

          <div className="page-dropdown">
            <h2>Head:</h2>
            <Select
              isSearchable={false}
              placeholder='Choose a head'
              options={dropdown[1]}
              onChange={(e) => { setHead(e.value) }}
            />
          </div>

          <div className="page-dropdown">
            <h2>Eyes:</h2>
            <Select
              isSearchable={false}
              placeholder='Choose a eyes'
              options={dropdown[2]}
              onChange={(e) => { setEyes(e.value) }}
            />
          </div>

          <div className="page-dropdown">
            <h2>Mouth:</h2>
            <Select
              isSearchable={false}
              placeholder='Choose a mouth'
              options={dropdown[3]}
              onChange={(e) => { setMouth(e.value) }}
            />
          </div>
        </div>
      </div>

      <div id="container">
        <button id="options" onClick={() => window.location.href=`?`}> Draw Random Scribble </button>

        <button id="options" onClick={() => {
          handleCreateScribble();
          navigateToPage(`gallery/?body=${scribble[0]}&head=${scribble[1]}&eyes=${scribble[2]}&mouth=${scribble[3]}`);
        }}> Save My Scribble </button>
      </div>

    </div>
  )
}