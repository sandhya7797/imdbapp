package com.imdbapp.movieservice.Exceptions;

public class MovieNotExistsException extends Exception {

    public MovieNotExistsException(String message) {
        super(message);
    }
}
