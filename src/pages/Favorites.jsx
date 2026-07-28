import MovieCard from "../components/MovieCard";


function Favorites({favoriteMovies,toggleFavorite}) {
    return(
        <>
        <div className="favorites-section">
            <h2 className="favorites-title">Favorite Movies</h2>
            <div className="favorites-grid">
            {favoriteMovies.map((movie)=>{
                return (
                <MovieCard
                key={movie.id}
                movie={movie}
                toggleFavorite={toggleFavorite}
                favoriteMovies={favoriteMovies}
                />
                )
            })}
            </div>
        </div>
        </>
    )
}
export default Favorites;