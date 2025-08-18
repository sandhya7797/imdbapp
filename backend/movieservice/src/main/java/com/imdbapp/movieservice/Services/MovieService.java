package com.imdbapp.movieservice.Services;

import com.imdbapp.movieservice.Exceptions.MovieNotExistsException;
import com.imdbapp.movieservice.Models.Movie;
import com.imdbapp.movieservice.Repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long id) throws MovieNotExistsException {
        Optional<Movie> movie = Optional.ofNullable(movieRepository.findById(id).orElseThrow(() -> new MovieNotExistsException("Movie with id " + id + " does not exist")));
        return movie.get();
    }

    public Movie create(Movie movie) throws RuntimeException{
        Movie newMovie = new Movie();
        newMovie.setTitle(movie.getTitle());
        newMovie.setGenre(movie.getGenre());
        newMovie.setYear(movie.getYear());
        newMovie.setDirector(movie.getDirector());
        return movieRepository.save(newMovie);
    }

    public List<Movie> createAll(List<Movie> movies) throws RuntimeException {
        return movieRepository.saveAll(movies);
    }

    public void delete(Long id) throws MovieNotExistsException {
        Movie movie = getMovieById(id);
        movieRepository.delete(movie);
    }
}
