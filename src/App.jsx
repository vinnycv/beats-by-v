import { useState } from 'react'
import './App.css'
import { soundBank1, soundBank2 } from './sound-data.js'

// const soundKit = ["Heater kit", "Piano kit"];

const off = [{padId: "", name: "Power off", audioUrl: ""}];


function App() {
  
  const [power, setPower] = useState(false);
  const [bank, setBank] = useState(off);
  const [title, setTitle] = useState("Turn on power");
  const [display, setDisplay] = useState("Power off");
  const [volume, setVolume] = useState(0.5);
    
  function onPowerToggle() {
    let slider = document.getElementsByClassName('Power')[0];
    let bankSlider = document.getElementsByClassName('Sound Bank')[0];
    power === false ? (
      setPower(true), 
      setBank(soundBank2), 
      setTitle("Synth kit"), 
      setDisplay("Power on"),
      slider.classList.add("power")
    ) : (
      setPower(false), 
      setBank(off), 
      setTitle("Turn on power"), 
      setDisplay("Power off"),
      slider.classList.remove("power"),
      bankSlider.classList.remove("bank-toggle"));
  }
  
  function onBankToggle() {
    if (power !== false) {
      let slider = document.getElementsByClassName('Sound Bank')[0];
      bank === soundBank1 ? (
        setBank(soundBank2), 
        setTitle("Synth kit"), 
        setDisplay(""),
        slider.classList.remove("bank-toggle")
      ) : (
        setBank(soundBank1),
        setTitle("Heater kit"), 
        setDisplay(""),
        slider.classList.add("bank-toggle")
      );
    }
  }
  
  function playSound(audioId) {
    if (power === false) {
      alert("Turn on Drum Machine!");
      return
    }
    audioId = audioId.toUpperCase();
    let soundObject = bank.filter(s => s.padId === audioId);
    setDisplay(soundObject[0].name);
    let audio = document.getElementById(audioId);
    audio.setAttribute("src", soundObject[0].audioUrl);
    // audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }
  
  window.onkeydown = (event) => {
    let code = event.key.toUpperCase();
    let keys = {'Q': 1, 'W': 2, 'E': 3, 'A': 4, 'S': 5, 'D': 6, 'Z': 7, 'X': 8, 'C': 9};
    if (keys.hasOwnProperty(code)) {
      let el = document.getElementById(keys[code]);
      el.className += ' active';
      playSound(code);
      setTimeout(() => el.className = 'drum-pad', 100);
    }
    code === 'P' ? onPowerToggle() : null;
    code === 'B' ? onBankToggle() : null;
  }
  
  function handleVolumeChange(value) {
    setVolume(value);
    let volumeInput = document.getElementById("volume");
    volumeInput.setAttribute("value", value);
  }
  
  return (
    <div id="drum-machine">
      <DrumpadBoard onPlay={playSound}/>
      <div id="controls-display">
        <Toggle 
          title="Power" 
          onToggle={onPowerToggle}/>
        <Display show={display}/>
        <Volume 
          currentVolume={volume}
          setVolume={handleVolumeChange}/>
        <Toggle 
          title="Sound Bank" 
          kit={title} 
          onToggle={onBankToggle}/>
      </div>
      <img 
          alt="react"
          src="https://asset.brandfetch.io/idb_-qgq55/id2Y_kwYxJ.jpeg"
          />
    </div>
  )
}

function DrumpadBoard({ onPlay }) {
  return (
    <div id='drum-pad-grid'>
      <Drumpad id="1" audioId="Q" play={onPlay}/>
      <Drumpad id="2" audioId="W" play={onPlay}/>
      <Drumpad id="3" audioId="E" play={onPlay}/>
      <Drumpad id="4" audioId="A" play={onPlay}/>
      <Drumpad id="5" audioId="S" play={onPlay}/>
      <Drumpad id="6" audioId="D" play={onPlay}/>
      <Drumpad id="7" audioId="Z" play={onPlay}/>
      <Drumpad id="8" audioId="X" play={onPlay}/>
      <Drumpad id="9" audioId="C" play={onPlay}/>
    </div>
  )
}

function Drumpad({ id, audioId, play }) {
  return (
    <div 
      className="drum-pad"
      id={id}
      onClick={() => play(audioId)}>
      <p>{audioId}</p>
      <audio
        className="clip" 
        id={audioId} 
        src=""
      ></audio>
    </div>
  )
}

function Display({ show }) {
  return (
    <div id="display">
      <p>{show}</p>
    </div>
  )
}

function Volume({ currentVolume, setVolume }) {
  return (
    <label for="volume">
      <p id="volume-title">Volume</p>
      <input 
        id="volume" 
        type="range" 
        min="0" 
        max="1" 
        step=".01" 
        value={currentVolume} 
        onChange={(event) => setVolume(event.target.value)}>
        </input>
    </label>
  )
}

function Toggle({title, kit, onToggle}) {
  return (
    <>
      <p id="toggle-title">{title}</p>
      <div 
        id="toggle" 
        onClick={onToggle}>
        <div 
          id="toggle-slider"
          className={title}>
        </div>
      </div>
      {kit && <p id="sound-bank-name">{kit}</p>}
    </>
  )
}

export default App
