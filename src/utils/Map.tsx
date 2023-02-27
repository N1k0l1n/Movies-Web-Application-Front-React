import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import * as L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import coordinatesDTO from "./coordinates.model";

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps) {
  const [coordinates, setCoordinates] = useState<coordinatesDTO[]>(
    props.coordinates
  );

  return (
    <MapContainer
      center={[41.328281, 19.818651]}
      zoom={14}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="React Movies"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.readOnly ? null : (
        <MapClick
          setCoordinates={(coordinates) => {
            setCoordinates([coordinates]);
            props.handleMapClick(coordinates);
          }}
        />
      )}

      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={[coordinate.lat, coordinate.lng]}>
          {coordinate.name ? <Popup>{coordinate.name}</Popup> : null}
        </Marker>
      ))}
    </MapContainer>
  );
}

interface mapProps {
  height: string;
  coordinates: coordinatesDTO[];
  handleMapClick(coordinates: coordinatesDTO): void;
  readOnly: boolean;
}

Map.defaultProps = {
  height: "500px",
  handleMapClick: () => {},
  readOnly: false,
};

function MapClick(props: mapClickProps) {
  useMapEvent("click", (eventArgs) => {
    props.setCoordinates({
      lat: eventArgs.latlng.lat,
      lng: eventArgs.latlng.lng,
    });
  });
  return null;
}

interface mapClickProps {
  setCoordinates(coordinates: coordinatesDTO): void;
}
