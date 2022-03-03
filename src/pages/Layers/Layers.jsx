import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import Select from 'react-select';

import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './layers.css';
import LayerItem from '../../components/LayerItem/LayerItem';

export default function Layers() {

  const [layers, setLayers] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  const [body, setBody] = useState(undefined);
  const [head, setHead] = useState(undefined);
  const [eyes, setEyes] = useState(undefined);
  const [mouth, setMouth] = useState(undefined); 

  var lst = [{value:'blueberry', label:'blueberry'}, 
            {value:'orange', label:'orange'}, 
            {value:'lemon', label:'lemon'},
            {value:'lime', label:'lime'}]; 

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const history = useHistory();



  useEffect(() => {
    axios.get(`${backendurl}/layers/list`)
      .then((response) => {
        console.log(response.data);
        if (response.data){
          setLayers(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
    
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
      
      <div>
        <Select
          placeholder = 'Choose a head'
          options = {lst}
        />
      </div>
      
      <div className='image-center'>
        <LayerItem
          body = {body}
          head = {head}
          eyes = {eyes}
          mouth = {mouth}
        />
      </div>
      <div>
      <button className="page-button" onClick={() => setRefresh(refresh + 1) }> Draw Random Scribble </button>
      </div>

    </div>
  )
}
