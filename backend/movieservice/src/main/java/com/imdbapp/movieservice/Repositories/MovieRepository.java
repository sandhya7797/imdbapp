package com.imdbapp.movieservice.Repositories;

import com.imdbapp.movieservice.Models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {

    @Override
    Optional<Movie> findById(Long aLong);

    @Override
    List<Movie> findAll();

    @Override
    Movie save(Movie movie);

    @Override
    void delete(Movie entity);

    @Override
    <S extends Movie> List<S> saveAllAndFlush(Iterable<S> entities);
}
