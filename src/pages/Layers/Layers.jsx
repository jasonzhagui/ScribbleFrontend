import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import Select from 'react-select';

import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './layers.css';
import LayerItem from '../../components/LayerItem/LayerItem';

export default function Layers() {

  const [error, setError] = useState(undefined);
  
  const [body, setBody] = useState(undefined);
  const [head, setHead] = useState(undefined);
  const [eyes, setEyes] = useState(undefined);
  const [mouth, setMouth] = useState(undefined); 

  const [dropdown, setDropdown] = useState([]);

  const [refresh, setRefresh] = useState(undefined);

  const [scribble, setScribble] = useState([]);

  const history = useHistory();

  const refreshPage = ()=>{
    window.location.reload();
  }

  useEffect(() => {
    axios.get(`${backendurl}/layers/dropdownList`)
      .then((response) => {
        if (response.data){

          setDropdown(response.data)
        }
      })

    axios.get(`${backendurl}/layers/body`)
      .then((response) => {
        console.log(response.data);
        if (response.data){
          let bodyValues = Object.values(response.data[0])
          setBody(bodyValues[Math.floor(Math.random() * bodyValues.length)]);
        }
      })

    axios.get(`${backendurl}/layers/head`)
      .then((response) => {
        console.log(response.data);
        if (response.data){
          let headValues = Object.values(response.data[0])
          setHead(headValues[Math.floor(Math.random() * headValues.length)]);
        }
      })

    axios.get(`${backendurl}/layers/eyes`)
      .then((response) => {
        console.log(response.data);
        if (response.data){
          let eyesValues = Object.values(response.data[0])
          setEyes(eyesValues[Math.floor(Math.random() * eyesValues.length)]);
        }
      })

    axios.get(`${backendurl}/layers/mouth`)
      .then((response) => {
        console.log(response.data);
        if (response.data){
          let mouthValues = Object.values(response.data[0])
          setMouth(mouthValues[Math.floor(Math.random() * mouthValues.length)]);
        }
      })
    }, 
  [refresh])

  function testSetScribble(){
    console.log("scribble");
    setScribble([body,head,eyes,mouth])
    console.log(scribble);

  }

  return (
    <div className="content">

      <div className="layers-header">
        <PageTitle
          text="Layers"
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
      
      <div className='image-center'>
        <LayerItem
          body = {body}
          head = {head}
          eyes = {eyes}
          mouth = {mouth}
        />
      </div>
      <div>
      <button className="page-button" onClick={refreshPage}> Draw Random Scribble </button>
      </div>

      <div className="page-dropdown">
        <h2>Body:</h2>
        <Select
          isSearchable = {false}
          placeholder = 'Choose a body'
          options = {dropdown[0]}
          onChange={(e) => {setBody(e.value)}}
        />
      </div>

      <div className="page-dropdown">
        <h2>Head:</h2>
        <Select
          isSearchable = {false}
          placeholder = 'Choose a head'
          options = {dropdown[1]}
          onChange={(e) => {setHead(e.value)}}
        />
      </div>

      <div className="page-dropdown">
      <h2>Eyes:</h2>
        <Select
          isSearchable = {false}
          placeholder = 'Choose a eyes'
          options = {dropdown[2]}
          onChange={(e) => {setEyes(e.value)}}
        />
      </div>

      <div className="page-dropdown">
      <h2>Mouth:</h2>
        <Select
          isSearchable = {false}
          placeholder = 'Choose a mouth'
          options = {dropdown[3]}
          onChange={(e) => {setMouth(e.value)}}
        />
      </div>
      <div>
        <button className="page-button" onClick={testSetScribble}> Save My Scribble </button>
      </div>

    </div>
  )
}
