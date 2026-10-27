import './App.css'
import HomePage from './components/HomePage'
import ShowDetails from './components/ShowDetails'
import { Route,Routes } from 'react-router-dom'
function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shows/:id" element={<ShowDetails />}/>
      </Routes>
    </>
  )
}

export default App
