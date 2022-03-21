import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


import PageTitle from '../../components/PageTitle/PageTitle';

import './gallery.css';

export default function Gallery() {

  const history = useHistory();


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

    </div>
  )
}
