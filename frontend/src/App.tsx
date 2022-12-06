import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Brick, LedBrick} from "typescript-arduinoml";
import {NewBrickComponent} from "./components/bricks/new-brick.component";

function App() {

  const tst = () => {
    const birc: LedBrick = new LedBrick("dd", 12);
  }

  return (
    <div className="App">

        <NewBrickComponent></NewBrickComponent>

    </div>
  );
}

export default App;
