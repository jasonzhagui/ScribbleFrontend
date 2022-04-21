import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { backendurl } from '../../config';

import { useSession } from '../../context/sessioncontext';
import LayerItem from '../../components/LayerItem/LayerItem';
import './home.css';

export default function Home() {
  const history = useHistory();

  const session = useSession();

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [bodies, setBodies] = useState([]);
  const [heads, setHeads] = useState([]);
  const [eyes, setEyes] = useState([]);
  const [mouths, setMouths] = useState([]);


  useEffect(() => {
    if (localStorage.getItem('username')) {
      setLogged(true);
    }

    axios.get(`${backendurl}/layers/list`)
      .then((response) => {
        if (response.data) {

          let bodyValues = [];
          let bodyKeys = Object.values(response.data[0])
          for (let i = 0; i < 9; i++) {
            bodyValues.push(bodyKeys[Math.floor(Math.random() * bodyKeys.length)]);

          }
          setBodies(bodyValues);


          let headValues = [];
          let headKeys = Object.values(response.data[1])
          for (let i = 0; i < 9; i++) {
            headValues.push(headKeys[Math.floor(Math.random() * headKeys.length)]);

          }
          setHeads(headValues);

          let eyesValues = [];
          let eyesKeys = Object.values(response.data[2])
          for (let i = 0; i < 9; i++) {
            eyesValues.push(eyesKeys[Math.floor(Math.random() * eyesKeys.length)]);

          }
          setEyes(eyesValues);

          let mouthValues = [];
          let mouthKeys = Object.values(response.data[3])
          for (let i = 0; i < 9; i++) {
            mouthValues.push(mouthKeys[Math.floor(Math.random() * mouthKeys.length)]);

          }
          setMouths(mouthValues);

        }
      })
  }, [])

  const handleLogin = () => {
    axios.get(`${backendurl}/user/${username}/${password}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          console.log("username: ", username);
          console.log("password: ", password);
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          setLogged(!logged);
        }
      })
  }

  function navigateToPage(path) {
    history.push(path);
  }

  function clear() {
    localStorage.clear();
    setUsername('');
    setPassword('');
    setLogged(!logged);
  }

  return (
    <div className="content">
      <h1>Scribble</h1>
      <div>
        <h2>Make Scribble Art</h2>
      </div>
      <button
        onClick={() => navigateToPage('/layers')}
        className="page-button"
      >
        Draw a Scribble
      </button>
      <button
        onClick={() => navigateToPage('/gallery')}
        className="page-button"
      >
        View my Gallery
      </button>

      {!logged &&
        <>
          <div>
            <label for='username'> Username: </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <label for='password'> Password: </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button
            onClick={() => {
              handleLogin();
            }}
            className="page-button"
          >
            Login
          </button>

        </>
      }

      {logged &&
        <button
          onClick={() => clear()}
          className="page-button"
        >
          Logout
        </button>
      }

      <div class="flex-home-container">

        <div class="flex-home-item-right">

          <div className='image-center'>
            <LayerItem
              body={"https://i.ibb.co/bFPRST7/Blazer.png"}
              head={"https://i.ibb.co/Sf7W06W/Blueberry.png"}
              eyes={"https://i.ibb.co/qLHdSgh/Cool-Shades.png"}
              mouth={"https://i.ibb.co/sHM8bjW/Angry.png"}
              size={500}
            />
          </div>

        </div>

        <div class="flex-home-item-left">

          <h1>Randomly Generated Scribbles</h1>
          <br></br>
          <p1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p1>
          <br></br>
          <button className="page-home-button"> Draw a Scribble </button>
          <button className="page-home-button"> View my Gallery</button>
          <button className="page-home-button"> Sign in</button>

        </div>

      </div>
      <div>
        <center>
          <h1>More Scribbles</h1>
          <p1>Click on any character to edit</p1>
        </center>
      </div>

      <div class="flex-home-container">

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[0]}&head=${heads[0]}&eyes=${eyes[0]}&mouth=${mouths[0]}`}>
            <LayerItem
              body={bodies[0]}
              head={heads[0]}
              eyes={eyes[0]}
              mouth={mouths[0]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[1]}&head=${heads[1]}&eyes=${eyes[1]}&mouth=${mouths[1]}`}>
            <LayerItem
              body={bodies[1]}
              head={heads[1]}
              eyes={eyes[1]}
              mouth={mouths[1]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[2]}&head=${heads[2]}&eyes=${eyes[2]}&mouth=${mouths[2]}`}>
            <LayerItem
              body={bodies[2]}
              head={heads[2]}
              eyes={eyes[2]}
              mouth={mouths[2]}
              size={300}
            />
          </div>

        </div>

      </div>

      <div class="flex-home-container">

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[3]}&head=${heads[3]}&eyes=${eyes[3]}&mouth=${mouths[3]}`}>
            <LayerItem
              body={bodies[3]}
              head={heads[3]}
              eyes={eyes[3]}
              mouth={mouths[3]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[4]}&head=${heads[4]}&eyes=${eyes[4]}&mouth=${mouths[4]}`}>
            <LayerItem
              body={bodies[4]}
              head={heads[4]}
              eyes={eyes[4]}
              mouth={mouths[4]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center 'onClick={e => window.location.href=`layers/?body=${bodies[5]}&head=${heads[5]}&eyes=${eyes[5]}&mouth=${mouths[5]}`}>
            <LayerItem
              body={bodies[5]}
              head={heads[5]}
              eyes={eyes[5]}
              mouth={mouths[5]}
              size={300}
            />
          </div>

        </div>

      </div>

      <div class="flex-home-container">

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[6]}&head=${heads[6]}&eyes=${eyes[6]}&mouth=${mouths[6]}`}>
            <LayerItem
              body={bodies[6]}
              head={heads[6]}
              eyes={eyes[6]}
              mouth={mouths[6]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[7]}&head=${heads[7]}&eyes=${eyes[7]}&mouth=${mouths[7]}`}>
            <LayerItem
              body={bodies[7]}
              head={heads[7]}
              eyes={eyes[7]}
              mouth={mouths[7]}
              size={300}
            />
          </div>

        </div>

        <div class="flex-home-item-right">

          <div className='image-home-center ' onClick={e => window.location.href=`layers/?body=${bodies[8]}&head=${heads[8]}&eyes=${eyes[8]}&mouth=${mouths[8]}`}>
            <LayerItem
              body={bodies[8]}
              head={heads[8]}
              eyes={eyes[8]}
              mouth={mouths[8]}
              size={300}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

