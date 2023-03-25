import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import AddForm from './Components/AddForm';
import EditForm from './Components/EditForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>

      <div className="text-[#111827]">
        <NavBar />
        <div className="container relative">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-task' element={<AddForm />} />
            <Route path='/edit-task/:id' element={<EditForm />} />
          </Routes>
        </div>

      </div>

    </Router>
  );
}

export default App;
