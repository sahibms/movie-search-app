import { useNavigate } from "react-router-dom";
import {FaHeart,FaRegHeart} from "react-icons/fa"


function MovieCard({movie,toggleFavorite,favoriteMovies}) {
    const navigate = useNavigate();
    const isFavorite = favoriteMovies.find((favoriteMovie)=>{
        return favoriteMovie.id === movie.id;
    })
    
    return(
        <div className="movie-card">
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onClick={()=>navigate(`/movie/${movie.id}`)}
            />
            <button className="favorite-btn" onClick={()=>toggleFavorite(movie)}>{isFavorite ? <FaHeart/> : <FaRegHeart/>}</button>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">{movie.release_date?.split("-")[0]}</p>
        </div> 
    );
}
export default MovieCard;