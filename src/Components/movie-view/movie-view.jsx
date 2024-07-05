import { useEffect, useState } from "react";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <img src={movie.Image} alt="" width={150} height={150} />
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <button 
          onClick={onBackClick} 
          className="back-button"
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    );
  };
