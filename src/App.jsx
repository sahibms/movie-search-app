import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import { useState,useEffect } from "react";
import "./App.css";

function App(){
  const[favoriteMovies,setFavoriteMovies] = useState(()=>{
    const savedFavorites = localStorage.getItem("favoriteMovies");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  })

  useEffect(()=>{
    localStorage.setItem("favoriteMovies",JSON.stringify(favoriteMovies));
  },[favoriteMovies]);


   const toggleFavorite = (movie)=>{
        const existingMovie = favoriteMovies.find((favoriteMovie)=>{
            return favoriteMovie.id === movie.id;

        }); 
        if(existingMovie) {
            setFavoriteMovies(favoriteMovies.filter((favoriteMovie)=>{
                return favoriteMovie.id !== movie.id
            }))
            return;
        }
        setFavoriteMovies([...favoriteMovies,movie])
    }
    
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={
        <Home
        favoriteMovies={favoriteMovies}
        toggleFavorite={toggleFavorite}
        />}/>
      <Route path="/movie/:id" element={<MovieDetails/>}/>
      <Route path="/favorites" element={
        <Favorites
        favoriteMovies={favoriteMovies}
        toggleFavorite={toggleFavorite}
        />}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}
export default App;
