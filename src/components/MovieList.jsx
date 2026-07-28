import MovieCard from "./MovieCard";

function MovieList({popularMovies,topRatedMovies,trendingMovies,searchMovies,searched,toggleFavorite,favoriteMovies}) {
    return(
        <>
         <div className="movie-section">
            <h2 className="section-title">Popular Movies</h2>
            <div className="movie-grid">
            {popularMovies.map((movie)=>{
                return(
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    favoriteMovies={favoriteMovies}
                    />
                );
            })}
            </div>
        </div>

         <div className="movie-section">
            <h2 className="section-title">Top Rated Movies</h2>
            <div className="movie-grid">
            {topRatedMovies.map((movie)=>{
                return(
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    favoriteMovies={favoriteMovies}
                    />
                );
            })}
            </div>
        </div>

         <div className="movie-section">
            <h2 className="section-title">Trending Movies</h2>
            <div className="movie-grid">
            {trendingMovies.map((movie)=>{
                return(
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    favoriteMovies={favoriteMovies}
                    />
                );
            })}
            </div>
        </div>

        {searched && searchMovies.length === 0 && (
            <div className="movie-section">
                <h2 className="section-title">Search Movies</h2>
                <p className="no-movies">No movies found</p>
            </div>
        )}
        {searchMovies.length > 0 && (
             <div className="movie-section">
            <h2 className="section-title">Search Movies</h2>
            <div className="movie-grid">
            {searchMovies.map((movie)=>{
                return(
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    favoriteMovies={favoriteMovies}
                    />
                );
            })}
            </div>
        </div>
        )} 
        </>
    );
    
}
export default MovieList;