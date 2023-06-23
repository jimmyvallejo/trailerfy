'use client'
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get("/api/movies");
        console.log(response)
        setAllMovies(response.data);
      } catch (error) {
        console.log(error.data);
      }
    };
     
    getMovies();
  }, []);

  useEffect(() => {
    console.log(allMovies)
  }, [allMovies])

  return (
    <MovieContext.Provider value={{allMovies}}>{children}</MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
