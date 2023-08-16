import React from "react";
import '../App.css';
import { useState, useEffect, useRef, forwardRef } from "react";
import {
    Polyline,
    Marker,
    Popup,
    Polygon,
    GeoJSON
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import axios from 'axios';







const PolyLine = () => {

  const [data, setData] = useState();
  const [geojsonData, setGeojsonData] = useState();


  useEffect(() => {
    // Fetch the GeoJSON data using Axios when the component mounts
    axios.get('http://localhost:8080/C240/geojson')
      .then(response => {
        // Set the fetched GeoJSON data to the state
        setGeojsonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching GeoJSON data:', error);
      });
  }, []);

      const jsonString = JSON.stringify(geojsonData, null, 2);
      const purpleOptions = { color: 'purple' }
   

      const polyline = [
        [-6.97130661970273, 107.50675231698288],
        [-6.971519687581599, 107.50506314579158],
        [-6.971945785000772 , 107.50480557323037],
        [-6.971647497824093, 107.5068220762182]
      ]


  return (
    <div>
 
      {/* {geojsonData && (
        <GeoJSON data={geojsonData} />
      )} */}
        {/* <GeoJSON data={geojsonData} /> */}
        <Polyline pathOptions={purpleOptions} positions={polyline} />

    </div>
    

   

        
  );
}
export default PolyLine;

