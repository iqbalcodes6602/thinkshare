import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import MainText from "./components/MainText"
import { useState } from "react"

function App() {
  const [show, setShow] = useState(true)


  return (
    <>
      <div
        id='modal-overlay'
        style={{
          width: '100vw',
          height: '100vh',
          display: show ? 'flex' : 'none',
          background: 'rgb(36 36 36 / 70%)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 999,
          backdropFilter: 'blur(2px)',
        }}>
        <div
          id='modal'
          style={{
            width: '30vw',
            minHeight: '25vh',
            background: 'white',
            padding: '20px',
            fontFamily: 'system-ui',
            borderRadius: '5px',
            fontWeight: 700,
            color: '#3f3f3f',
            boxShadow: '0px 0px 20px 0px #353535',
          }}>
          Dear Users,<br />
          Our website is currently in the testing phase and hosted on a free platform. Please expect a brief loading time, up to 1-2 minutes. We appreciate your patience. Thank You!
          <br />
          <center><button onClick={() => { setShow(false) }}>Continue</button></center>
        </div>
      </div >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path="/documents/:id" element={<MainText />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
