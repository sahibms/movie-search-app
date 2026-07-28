import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import { data } from "react-router-dom";
import Favorites from "./Favorites";

function Home({favoriteMovies,toggleFavorite}) {
    const[searchMovie,setSearchMovie] = useState("");
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState("");
    const[popularMovies,setPopularMovies] = useState([]);
    const[trendingMovies,setTrendingMovies] = useState([]);
    const[topRatedMovies,setTopRatedMovies] = useState([]);
    const[searchMovies,setSearchMovies] = useState([]);
    const[searched,setSearched] = useState(false);
    

    const fetchPopularMovies = async () =>{
        try {
            setLoading(true);
            setError("");
            const response = await fetch
            (`https://api.themoviedb.org/3/movie/popular?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`);

            if(!response.ok) {
                throw new Error("Failed to fetch popular movies")
            }

            const data = await response.json();

            setPopularMovies(data.results);

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    const fetchTopRatedMovies = async () =>{
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`
            );
            if(!response.ok) {
                throw new Error("Failed to fetch top rated movies")
            };
            const data =  await response.json();
            setTopRatedMovies(data.results);

        } catch(error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }

    }

    const fetchTrendingMovies = async () =>{
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`
            );
            if(!response.ok) {
                throw new Error("Failed to fetch trending movies");
            }
            const data = await response.json();
            setTrendingMovies(data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchSearchMovies = async ()=>{
        if(searchMovie.trim() === "") {
            setError(" Please enter a movie");
            return;
        }
        setSearched(true);
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=7527e40ed1a7e2bea3ec5d220d9326a3&query=${searchMovie}`
            );
            if(!response.ok) {
                throw new Error("Failed to fetch movies")
            }
            const data = await response.json();
            setSearchMovies(data.results);

            localStorage.setItem("searchMovie",searchMovie);
            localStorage.setItem("searchResults",JSON.stringify(data.results));
        } catch(error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        fetchPopularMovies();
        fetchTopRatedMovies();
        fetchTrendingMovies();
    },[]);

    useEffect(()=>{
        const savedSearch = localStorage.getItem("searchMovie");
        const savedResults = localStorage.getItem("searchResults")

        setSearchMovie(savedSearch);
        setSearchMovies(JSON.parse(savedResults));

    },[])

    return(
        <>
        <SearchBar
        searchMovie={searchMovie}
        setSearchMovie={setSearchMovie}
        setSearchMovies={setSearchMovies}
        loading={loading}
        fetchSearchMovies={fetchSearchMovies}
        />

        {error && <p className="error-message">{error}</p>}

        <MovieList
        popularMovies={popularMovies}
        topRatedMovies={topRatedMovies}
        trendingMovies={trendingMovies}
        searchMovies={searchMovies}
        searched={searched}
        toggleFavorite={toggleFavorite}
        favoriteMovies={favoriteMovies}
        />
        </>

    );
}
export default Home;