import "./Movie.css";
// Import React component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid icons
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

// Regular icons
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Movie = ({movie}) => {

    const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const title = movie.original_title;
    const rating = movie.vote_average!==undefined ? Number(movie.vote_average).toFixed(1):'N/A';

    return (
        <>
        <div className="movie-container">
            <div className="image-poster">
                <img src={poster} alt={title}/>
            </div>
            <div>
                <div className="stars">
                    <span><FontAwesomeIcon icon={faStar} className="fa-star"/></span>{' '}
                    <span className="rating-text">{rating}</span>
                    <span><FontAwesomeIcon icon={farStar} /></span>{' '} 
                </div>
            </div>
            <h3>{title}</h3>
            <div className="watch-options">
                <button>Watch options</button>
            </div>
            <div className="trailer">
                <button><FontAwesomeIcon icon={faPlay} className="fa-icon" />Trailer</button>
            </div>
        </div>
        </>
    );
}

export default Movie;