import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";



function MovieDetails() {
    const {id} = useParams();

    const[movie,setMovie] = useState(null);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState("");
    const[credits,setCredits] = useState(null);
    const[videos,setVideos] =useState([]);

    const fetchMovieDetails = async () =>{

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`
            );
            if(!response.ok) {
                throw new Error("Failed to fetch movie details")
            }
            const data = await response.json();
            setMovie(data);
    
    }

    const fetchMovieCredits = async ()=>{

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`
            );

            if(!response.ok) {
                throw new Error("Failed to fetch movie credits");
            }
            const data = await response.json();
            
            setCredits(data);
    }

    const fetchMovieVideos = async ()=>{

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7527e40ed1a7e2bea3ec5d220d9326a3`
            );

            if(!response.ok) {
                throw new Error("Failed to fetch movie videos");
            }
            const data = await response.json();
            
            setVideos(data.results);
    }


    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setLoading(true);
                setError("");

              await Promise.all([
                fetchMovieDetails(),
                fetchMovieCredits(),
                fetchMovieVideos(),
              ]);

            } catch (error) {
                setError("Somthing went wrong. Please try again");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[id]);


    const trailer =
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Teaser"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.name.toLowerCase().includes("trailer")
  ) ||
  videos.find(
    (video) => video.site === "YouTube"
  );

  return (
  <>
    <h2 className="page-title">Movie Details</h2>

    {loading || !movie ? (
      <Loader />
    ) : error ? (
      <h2 className="error-message">{error}</h2>
    ) : (
      <>
        <div className="movie-details">
          <img
          className="details-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <h2 className="details-title">{movie.title}</h2>

          <p className="details-text">Release Date: {movie.release_date}</p>
          <p className="details-text">Rating: {movie.vote_average}</p>
          <p className="details-text">Runtime: {movie.runtime} min</p>
          <p className="details-text">
            Genre: {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="details-text">Overview: {movie.overview}</p>
        </div>

        <div className="movie-cast">
          <h2 className="cast-title">Movie Cast</h2>

          {credits?.cast?.slice(0, 5).map((actor) => (
            <p className="cast-name" key={actor.id}>{actor.name}</p>
          ))}
        </div>

        <div className="movie-trailer">
          <h2 className="trailer-title">Movie Trailer</h2>

          {trailer ? (
            <iframe
              className="trailer-video"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie.title} - ${trailer.name}`}
              width="100%"
              height="400"
              allowFullScreen
            />
          ) : (
            <p className="no-trailer">Trailer not available</p>
          )}
        </div>
      </>
    )}
  </>
); 
}
export default MovieDetails;