import { useState } from 'react'
import './App.css'

function App() {
  function displayName(){
    const name = document.getElementById("name").value;
    alert(`Welcome to CPSC2650, ${name}`);
  }

  return (
    <>
      <h1>This is a simple react app :)</h1>
      <input type="text" name="name" id="name" placeholder='Enter your name'/>
      <button onClick={displayName}>Submit</button>
    </>
  )
}

export default App
