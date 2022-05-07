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

          let headValues = [];
          let headKeys = Object.values(response.data[1])

          let eyesValues = [];
          let eyesKeys = Object.values(response.data[2])

          let mouthValues = [];
          let mouthKeys = Object.values(response.data[3])

          for (let i = 0; i < 9; i++) {
            bodyValues.push(bodyKeys[Math.floor(Math.random() * bodyKeys.length)]);
            headValues.push(headKeys[Math.floor(Math.random() * headKeys.length)]);
            eyesValues.push(eyesKeys[Math.floor(Math.random() * eyesKeys.length)]);
            mouthValues.push(mouthKeys[Math.floor(Math.random() * mouthKeys.length)]);
          }
          setBodies(bodyValues);
          setHeads(headValues);
          setEyes(eyesValues);
          setMouths(mouthValues);


        }
      })
  }, [])

  const scribbles = bodies.map((b, index) => {
    return {
      id: index,
      body: b,
      head: heads[index],
      eyes: eyes[index],
      mouth: mouths[index]
    }
  });

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
    <div className="content-home">
      <h1>Scribble</h1>
      <div>
        <h2>Make Scribble Art</h2>
      </div>

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

          <h2>Randomly Generated Scribbles</h2>
          <br></br>
          <p1> Create cool Scribbles inspired from well-known NFT projects, by combining different attributes. Sign up to save them to your gallery.
          </p1>
          <br></br>
          <button onClick={() => navigateToPage('/layers')} className="page-home-button"> Draw a Scribble </button>
          <button onClick={() => navigateToPage('/gallery')} className="page-home-button"> View my Gallery </button>
          {logged &&
            <button
              onClick={() => clear()}
              className="page-home-button"
            >
              Logout
            </button>
          }
          {!logged &&
            <button onClick={() => navigateToPage('/SignIn')} className="page-home-button"> Sign in</button>
          }
          

        </div>

      </div>
      
      <div>
        <center>
          <h1>More Scribbles</h1>
          <p1>Click on any character to edit</p1>
        </center>
      </div>

      <div class="flex-home-container-scroll">

        {scribbles.map((scribble) => {

            return <div class="flex-home-item-right">
                      <div className='image-home-center' onClick={e => window.location.href=`layers/?body=${scribble.body}&head=${scribble.head}&eyes=${scribble.eyes}&mouth=${scribble.mouth}`}>
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

    </div>

  );
};

