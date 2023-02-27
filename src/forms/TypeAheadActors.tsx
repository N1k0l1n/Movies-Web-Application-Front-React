import axios, { AxiosResponse } from "axios";
import React, { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: typeAheadActorsProps) {
  const [options, setOptions] = useState<actorMovieDTO[]>([]);
  const [loading, setIsLoading] = useState(false);

  const selected: actorMovieDTO[] = [];

  const [draggedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);

  function handleSearch(query: string) {
    setIsLoading(true);

    axios
      .get(`${urlActors}/searchByName/${query}`)
      .then((response: AxiosResponse<actorMovieDTO[]>) => {
        setOptions(response.data);
        setIsLoading(false);
      });
  }

  function handleDragStart(actor: actorMovieDTO) {
    setDraggedElement(actor);
  }

  function handleDragOver(actor: actorMovieDTO) {
    if (!draggedElement) {
      return;
    }

    if (actor.id !== draggedElement.id) {
      const draggedElementIndex = props.actors.findIndex(
        (x) => x.id === draggedElement.id
      );

      const actorIndex = props.actors.findIndex((x) => x.id === actor.id);

      const actors = [...props.actors];
      actors[actorIndex] = draggedElement;
      actors[draggedElementIndex] = actor;
      props.onAdd(actors);
    }
  }

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(actors) => {
          console.log(actors);
          const actor = actors[0] as actorMovieDTO;
          const index = props.actors.findIndex((x) => x.id === actor.id);
          if (index != -1) {
            const a = props.actors[index];
            a.character = "";
            props.onAdd([...props.actors, a]);
          }
        }}
        options={options}
        labelKey="name"
        filterBy={() => true}
        isLoading={loading}
        onSearch={handleSearch}
        placeholder="Write the name of the actor..."
        minLength={2}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(actor) => {
          const a = actor as actorMovieDTO;
          return (
            <>
              <img
                alt="actor picture"
                src={a.picture}
                style={{
                  height: "64px",
                  marginRight: "10px",
                  width: "64px",
                }}
              />
              <span>{a.name}</span>
            </>
          );
        }}
      />
      <ul className="list-group">
        {props.actors.map((actor) => (
          <li
            key={actor.id}
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
            className="list-group-item list-group-item-action"
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              style={{ marginLeft: "0.5rem" }}
              //  onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface typeAheadActorsProps {
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  onRemove(actor: actorMovieDTO[]): void;
  listUI(actor: actorMovieDTO): ReactElement;
}
{
  /* <>
<img
  alt="actor picture"
  // src={actor.picture}
  style={{
    height: "64px",
    marginRight: "10px",
    width: "64px",
  }}
/>
<span>{actor}</span>
</> */
}
