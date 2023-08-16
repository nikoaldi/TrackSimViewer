import { useMapEvents} from 'react-leaflet';
import React, { useEffect, useState } from "react"
import { Dropdown, Menu } from "antd";
import { render } from '@testing-library/react';
import "./RContext.css";
import"../../node_modules/bootstrap/dist/css/bootstrap.min.css";

var lat = 0;
var lng = 0;

const menu = <Menu 
  items={[{
      label:lat,
      key:lat,

  }]}>
</Menu>

const Coordinate = () => {
  const [koodinat, setKoordinat] = useState("");
    useMapEvents({
      click(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        
        console.log("lat =" +lat);
        console.log("long =" +lng);
        alert(`${lat}`+" dan "+`${lng}`);    
        render(
            <div>
         
            </div>  
        )
      },
    });
    return false;
}

export default Coordinate;