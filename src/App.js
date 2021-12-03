import { Route, Routes } from 'react-router';

import './App.css';
import Navbar from './Navbar'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/Excercise-Tracker/' element={<Home/>}></Route>
        <Route path='/Excercise-Tracker/create' element={<Create/>}></Route>
        <Route path='/Excercise-Tracker/edit/:slug' element={<Edit/>}></Route>
      </Routes>
    </div>
  )
}

export default App
