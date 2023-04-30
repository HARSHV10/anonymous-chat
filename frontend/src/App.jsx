import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Msg from './component/msg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <Msg/>
    </div>
  )
}

export default App
