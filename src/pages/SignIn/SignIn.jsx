import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import PageTitle from '../../components/PageTitle/PageTitle';
import { backendurl } from '../../config';

import './signin.css';
import LayerItem from '../../components/LayerItem/LayerItem';

import { useSession } from '../../context/sessioncontext';

export default function SignIn() {
    
    const [logged, setLogged] = useState(false);
    const [exists, setExists] = useState(false);
    const [flag, setFlag] = useState(false);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('username')) {
          setLogged(true);
        }

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
              history.push('/')
            }
          })
    }

    const handleExists = () => {
        axios.get(`${backendurl}/check/${username}`)
        .then((response) => {
            if (response.data) {
                console.log(response.data);
                console.log("username exists : ", username);
                localStorage.setItem('username', username);
                setExists(!exists);
            }
        })
    }

    const handleSignup = () => {
        axios.post(`${backendurl}/user/register/${username}/${password}`)
        .then((response) => {
            if (response.data) {
                console.log(response.data);

                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                setLogged(!logged);
                history.push('/')
            }
        })
    }

    function clear() {
        localStorage.clear();
        setUsername('');
        setPassword('');
        setLogged(!logged);
    }



    return (
        <div className='content'>

            <div className="layers-header">
                <PageTitle
                text="Sign In"
                />
                <button
                onClick={() => history.push('/')}
                className="button"
                >
                {"<--"}Go Back Home
                </button>
            </div>

            <div className='flex-container'>

                <div className="flex-item-right">
                    <div className='image-center'>
                        <LayerItem
                        body={"https://i.ibb.co/bFPRST7/Blazer.png"}
                        head={"https://i.ibb.co/Sf7W06W/Blueberry.png"}
                        eyes={"https://i.ibb.co/qLHdSgh/Cool-Shades.png"}
                        mouth={"https://i.ibb.co/sHM8bjW/Angry.png"}
                        size={400}
                        />
                    </div>
                </div>

                <div className="flex-item-left">
                    {!flag &&
                    <>
                        <div>
                            <label for='username'> Username: </label>
                            <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        </div>

                      <button onClick={() => {
                        setFlag(!flag);
                        handleExists();
                      }}
                      className="page-sign-button">
                        Submit
                      </button>
                      </>
                    }
                    {exists && flag &&
                    <>
                        <div>
                            <p>Welcome Back!</p>
                            <label for='password'> Password: </label>
                            <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button onClick={() => {
                        handleLogin();
                      }}
                      className="page-sign-button">
                        Sign In
                      </button>

                    </>
                    }

                    {!exists && flag &&
                    <>
                        <div>
                            <p>Hello new user!</p>
                            <label for='password'> Password: </label>
                            <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button onClick={() => {
                        handleSignup();
                      }}
                      className="page-sign-button">
                        Sign Up
                      </button>
                    </>
                    }
                </div>

            </div>
        </div>
    )
}

