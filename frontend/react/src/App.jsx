import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './pages/Header'
import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Route, Routes } from 'react-router';
import MovieListPage from './pages/MovieListPage'

function App() {

  const { keycloak, initialized } = useKeycloak();

  if(!initialized) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/movies" element={<MovieListPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
