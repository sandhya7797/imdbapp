import { useKeycloak } from '@react-keycloak/web'
import "./header.css"
import MovieListPage from './MovieListPage';
import { Link } from 'react-router';

const Header = () => {

    const { keycloak, initialized } = useKeycloak();

    return (
        <div className="header-content">
            <div className="imdb-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"/>
            </div>
            <div className="search-box">
                <input type="text"/>
            </div>
            <div className="movies">
                <Link to="/movies">
                    <button>Movies</button>
                </Link>
            </div>
            <div className="watchlist">
                <button>+Watchlist</button>
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
                <button>EN</button>
            </div>
        </div>
    );
}

export default Header;