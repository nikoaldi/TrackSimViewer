import React, { useEffect, useState } from "react"
import {
    Polyline,
    Marker,
    Popup,
    Polygon,
    GeoJSON
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

const Socket = (props) => { 

    const [geojsonData, setGeojsonData] = useState(null);
    const [items, setItems] = useState([]);


  
   


    useEffect(() => {
        var connected = false;
        // Establish WebSocket connection
        const socket = new WebSocket('ws://localhost:8080/geosocket');
        socket.onopen = function() {
                    connected = true;
                    console.log("Connected to the web socket");
                };

        // Handle incoming data
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const newObj = data;
            setItems([...items, data]);
            // Assuming the incoming data is a GeoJSON object
            setGeojsonData(newObj);
            console.log(items);
          } catch (error) {
            console.error('Error parsing GeoJSON data:', error);
          }
        };
    
        // Clean up the WebSocket connection on unmount
        return () => socket.close();
      }, []);
    


      const styleGeoJSON = (feature) => {
        // Get the value from the properties and use it to determine the color
        const value = feature.properties.opacity;
    
        return {
          weight: 1,
          fillColor: '#00ff33',
          opacity: value,
          color: '#00ff33',
          fillOpacity: value,

        };
      };
    
      const onEachFeature = (feature, layer) => {
        // Bind a popup to each feature displaying its properties
        if (feature.properties) {
          layer.bindPopup(
            `<strong>Name:</strong> ${feature.properties.name}<br /><strong>Value:</strong> ${feature.properties.value}`
          );
        }
      };


    return (
        <div>
        {geojsonData && (
        <GeoJSON data={items} />
       )}
               {/* <GeoJSON data={geojsonData} /> */}
        </div>

    );
}

export default Socket; 