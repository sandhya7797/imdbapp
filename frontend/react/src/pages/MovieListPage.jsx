import { useState } from "react";
import { setMovies } from "../../../../../ReactJs/Class4/imdb-app/src/store/MovieList";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

const MovieListPage = () => {
    const { keycloak, initialized } = useKeycloak();

    const [movies, setMovies] = useState([]);
    const API_URL = 'http://localhost:9090/movies';
    const token = keycloak.token;

    console.log("token : ", token);

    useEffect( () => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setMovies(data);
            } catch(error) {
                console.error("Error fetching movies: ", error);
            }
        };
        if(initialized && keycloak?.token) {
            fetchMovies();
        }
    }, [initialized, keycloak]);

    return (
        <>
            <div>
                <h2>Movie List</h2>
                <ul>
                {
                    movies.map((movie)=> (
                        <li key={movie.id}>{movie.title}</li>
                    ))
                }
                </ul>
            </div>
        </>
    );
}

export default MovieListPage;