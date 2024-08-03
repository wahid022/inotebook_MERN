import './App.css';
import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';

function App() {

    return (
      <>
        <NoteState>
          <Router>
            <Navbar />
            <Alert message="This is amazing React course" />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </NoteState>
      </>
    );
}

export default App;

