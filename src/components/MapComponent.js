"use client"
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";


const MapComponent = ({location}) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (mapRef.current) {
      // If the map is already initialized, do nothing
      return;
    }

    // Initialize the map using the provided location data
    const map = L.map("map").setView([location.lat, location.lng], 11);
    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add a marker at the provided location
    const marker = L.marker([location.lat, location.lng]).addTo(map);
    marker
      .bindPopup("<b>Location</b><br>This is the provided location.")
      .openPopup();

    // Handle map click events
    const popup = L.popup();
    const onMapClick = (e) => {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    };
    map.on("click", onMapClick);

    // Cleanup function to remove the map instance on component unmount
    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, [location]);



  return <div id="map" style={{ height: "500px", width: "100%" }}  ></div>;
};

export default MapComponent;
