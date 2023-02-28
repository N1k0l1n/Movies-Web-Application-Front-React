import React, { useContext } from "react";
import { movieDTO } from "./movies.model";
import css from "../movies/IndividualMovie.module.css";
import { Link, useParams } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";

export default function IndividualMovies(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  const costomAlert = useContext(AlertContext);

  function deleteMovie() {
    axios.delete(`${urlMovies}/${props.id}`).then(() => {
      costomAlert();
    });
  }

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <div>
        <Link
          style={{ marginRight: "1rem" }}
          className="btn btn-info"
          to={`/movies/edit/${props.id}`}
        >
          Edit
        </Link>
        <Button
          onClick={() => customConfirm(() => deleteMovie())}
          className="btn btn-danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
