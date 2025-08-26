import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react'
import "./header.css"
import MovieListPage from './MovieListPage';
import { Link } from 'react-router-dom';

const Header = () => {

    const { keycloak, initialized } = useKeycloak();/* useKeycloak is a custom react-hook provided by keycloak integration library */
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const Logo_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nav-bar">
            <div className="imdb-logo">
                <Link to="/">
                    <img src={Logo_URL} alt="IMDB Logo"/>
                </Link>
            </div>
            <div className="menu">
                <button onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                    Menu
                </button>
            </div>
            <div className="search-container">
                <div className="search-dropdown">
                    <select>
                        <option>All</option>
                        <option>Titles</option>
                        <option>TV Episodes</option>
                        <option>Celebs</option>
                        <option>Keywords</option>
                    </select>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className="search-input">
                    <input type="text"/>
                    <i className="fa-solid fa-search search-icon"></i>
                </div>
            </div>
            <div className="movies">
                <Link to="/movies">
                    <button>Movies</button>
                </Link>
            </div>
            <div className="watchlist">
                <Link to="/addToWatchlist">
                <button>
                    <div className="watchlist-icon-container">
                        <i className="fa-solid fa-bookmark"></i>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <span>Watchlist</span>
                </button>
                </Link>
            </div>
            {/* Sign in button show only when user not authenticated */} 
            <div className="signin">
                {
                    !keycloak.authenticated && (
                        <div className="signin">
                            <button onClick={() => keycloak.login()}>Sign In</button>
                        </div>
                    )
                }

                {/* Sign out button show only when user is authenticated */}
                {
                    keycloak.authenticated && (
                        <div>
                            <button onClick={() => keycloak.logout()}>{keycloak.tokenParsed?.preferred_username?
                                keycloak.tokenParsed.preferred_username.charAt(0).toUpperCase() +
                                keycloak.tokenParsed.preferred_username.slice(1): ""}</button>
                        </div>
                    )
                }
                
            </div>
            <div className="language">
                <select defaultValue="en">
                 <option value="en">EN</option>
                 <option value="es">ES</option>
                 <option value="er">ER</option>
                </select>
                <i className="fa-solid fa-caret-down"></i>
            </div>
        </div>
    );
}

export default Header;