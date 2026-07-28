import {Link} from "react-router-dom";
function Navbar() {
    return(
        <nav className="navbar">
            <h1 className="logo">Movie Search App</h1>

            <div className="nav-links">
            <Link className="nav-link" to="/">Home</Link>
            <span className="nav-divider">|</span>
            <Link className="nav-link" to="/favorites">Favorites</Link>
            
            </div>
        </nav>

        
    );
}
export default Navbar;