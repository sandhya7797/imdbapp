package com.imdbapp.movieservice.Controllers;

import com.imdbapp.movieservice.Exceptions.MovieNotExistsException;
import com.imdbapp.movieservice.Models.Movie;
import com.imdbapp.movieservice.Services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> res = movieService.getAllMovies();
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) throws MovieNotExistsException {
        Movie res = movieService.getMovieById(id);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/create")
    public ResponseEntity<Movie> create(@RequestBody Movie movie) throws RuntimeException {
        Movie res = movieService.create(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/create/batch")
    public ResponseEntity<List<Movie>> createBatch(@RequestBody List<Movie> movies) throws RuntimeException {
        List<Movie> createdMovies = movieService.createAll(movies);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMovies);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws MovieNotExistsException {
        movieService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
