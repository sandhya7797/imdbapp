import { useState } from "react";
import { setMovies } from "../../../../../ReactJs/Class4/imdb-app/src/store/MovieList";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Movie from "./Movie";

const MovieListPage = () => {
    const {keycloak, initialized} = useKeycloak();
    const [movies, setMovies] = useState([]);
    const API_URL = "http://localhost:9090/movies";
    const token = keycloak.token;

   useEffect( () => {
     const fetchMovies = async () => {
        try {
            const res = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
        } catch(error) {
            console.log("error while fetching movies from backend!");
        }
    }
    if(initialized && keycloak.token) {
        fetchMovies();
    }
   }, [initialized, keycloak]);

   return (
    <>
        <ul className="movie-list">
            {
                keycloak.authenticated && (
                    movies.map((movie) => (
                        <li style={{listStyle:"none"}} key={movie.id}><Movie movie={movie}/></li>
                    ))
                )
            }
        </ul>
    </>
   );
}

export default MovieListPage;