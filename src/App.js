import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import Layers from './pages/Layers/Layers'; 
import Gallery from './pages/Gallery/Gallery';
import SignIn from './pages/SignIn/SignIn';

import {SessionProvider} from './context/sessioncontext';

import {backendurl} from './config';

import './App.css';

function App() {
  console.log(backendurl);
  return (
    <div className="root">
      <div className="content">
        <SessionProvider>
          <Router>
            <Switch>
              <Route exact={true} path={'/'}>
                <Home />
              </Route>
              <Route exact={true} path={'/layers'}>
                <Layers />
              </Route>
              <Route exact={true} path={'/gallery'}>
                <Gallery />
              </Route>
              <Route exact={true} path={'/SignIn'}>
                <SignIn />
              </Route>
            </Switch>
          </Router>
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
