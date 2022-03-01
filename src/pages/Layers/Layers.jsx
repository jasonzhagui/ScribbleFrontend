import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import RoomItem from '../../components/RoomItem/RoomItem';
import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './layers.css';
import LayerItem from '../../components/LayerItem/LayerItem';

export default function Layers() {
  const [rooms, setRooms] = useState(undefined);
  const [layers, setLayers] = useState(undefined);
  const [error, setError] = useState(undefined);

  
  
  const [body, setBody] = useState(undefined);
  const [head, setHead] = useState(undefined);
  const [eyes, setEyes] = useState(undefined);
  const [mouth, setMouth] = useState(undefined); 

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const [showLayers, setShowLayers] = useState(false);

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

  const handleCreateRoom = () => {
    axios.post(`${backendurl}/rooms/create/${newRoomName}`)
      .then(() => {
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      })
  }

  return (
    <div className="content">
      {isModalOpen && 
        <div className="create-modal">
          <input
            className="room-input"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <div className="create-actions">
            <button className="button" onClick={handleCreateRoom}>Create New Room</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      }

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

      <div className="layers-list">
        {layers ? layers.map((layer, index) => (
          <RoomItem
            key={`${layer.layer}-${index}`}
            name={layer.layer}
            //userCount={room.num_users}
          />
        )) : (
          <div className="layers-empty">
            <p>Sorry there are no layers right now... Come back later </p>
          </div>
        )}
      </div>
      <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Room </button>
      </div>
      

      <div>
        <button className="page-button" onClick={() => setShowLayers(!showLayers)}> Show Scribble </button>
        {showLayers &&
          <div className='image-center'>
            <LayerItem
              body = {body}
              head = {head}
              eyes = {eyes}
              mouth = {mouth}
            />
          </div>
        }
      </div>

    </div>
  )
}
