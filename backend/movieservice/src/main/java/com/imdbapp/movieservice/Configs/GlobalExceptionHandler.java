package com.imdbapp.movieservice.Configs;

import com.imdbapp.movieservice.Exceptions.MovieNotExistsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MovieNotExistsException.class)
    public ExceptionDTO handleMovieNotExistsException(MovieNotExistsException ex) {
        ExceptionDTO dto = new ExceptionDTO();
        dto.setMessage(ex.getMessage());
        return dto;
    }

    @ExceptionHandler(RuntimeException.class)
    public ExceptionDTO handleMovieCreationFailureException(RuntimeException ex) {
        ExceptionDTO dto = new ExceptionDTO();
        dto.setMessage("Failed to create Movie: " + ex.getMessage());
        return dto;
    }
}
