import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


import PageTitle from '../../components/PageTitle/PageTitle';
import {backendurl} from '../../config';

import './gallery.css';

export default function Gallery() {

  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(undefined);

  const [category, setCategory] = useState('');
  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {}, [refresh])

  const handleCreateLayer = () => {
    axios.post(`${backendurl}/layers/create/${category}/${newName}/${newLink}`)
      .then(() => {
        console.log('category');
        console.log(category);
        console.log('newName');
        console.log(newName);
        console.log('newLink');
        console.log(newLink);
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
  }

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

      {isModalOpen && 
        <div className="create-modal">
          <input
            value1={category}
            onChange={(e) => { setCategory(e.target.value1);}}
          />
          <input
            value2={newName}
            onChange={(e) => { setNewName(e.target.value2); }}
          />
          <input
            value3={newLink}
            onChange={(e) => { setNewLink(e.target.value3) }}
          />
          <div className="create-actions">
            <button className="button" onClick={handleCreateLayer}>Create New Layer</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      }

      <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}> input </button>
      </div>

    </div>
  )
}
