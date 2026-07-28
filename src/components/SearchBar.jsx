function SearchBar({searchMovie,setSearchMovie,fetchSearchMovies,setSearchMovies,loading}) {
    return(
        <div className="search-container">
            <input
            className="search-input"
            type="text"
            value={searchMovie}
            placeholder="Search movies..."
            onChange={(e)=>{
                const value = e.target.value;
                setSearchMovie(value);

                if(value.trim() === "") {
                    setSearchMovies([]);
                    localStorage.removeItem("searchMovie");
                    localStorage.removeItem("searchResults");
                }
            }}
            onKeyDown={(e)=>{if(e.key === "Enter"){fetchSearchMovies();}}}
            />

            <button className="search-btn" onClick={fetchSearchMovies} disabled={loading}>{loading ? "Searching" : "Search"}</button>

        </div>
    );
}
export default SearchBar;