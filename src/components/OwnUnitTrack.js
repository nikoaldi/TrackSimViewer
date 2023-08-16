import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import '../App.css';
import {
    Marker,
    Popup,
    Label
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import L from "leaflet";
import 'leaflet-rotatedmarker';


const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
    iconSize: [20, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10]
  });


function OwnUnitTrack(props) {


    // Ambil data Radar dari API Quarkus
    const [OwnshipData, setOwnshipData] = useState([]);


    var position=[];

    // GET RADAR TRACK
    // REQUEST GET OWNSHIP DATA 00
    const getOwnshipData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/ownunit/test');
        setOwnshipData(response.data)
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            getOwnshipData();
        },1000)    
    }, [])

    const enumEnvironment = {
        1: "Air",
        2: "Surface",
        3: "Subsurface",
        4: "Land"
    }
    
    const defaultIcon = L.icon({
        iconUrl: './ownship.png',
        iconSize: [20, 40],
        iconAnchor: [18, 18],
        popupAnchor: [0, -10],
        shadowAnchor: [10, 10]
      });
   
    return (        
        OwnshipData.map((ownship, index) => {
            position = [ownship.latitude, ownship.longitude]
                return (            
                    <div key={index} namaUpdate={ownship.id}> 
                    <script></script>
                         {/* <RotatedMarker
                            position={position}
                            rotationAngle={90}
                            rotationOrigin="center"
                            icon={defaultIcon}
                        >
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </RotatedMarker> */}
     
                        <Marker 
                            key={ownship.id}
                            position={position}
                            icon={new Icon({iconUrl: './ownship.png', iconSize: [40, 40]} )}
                            
                        >
                        <Popup>
                            <table >
                                <h5>Ownunit Track</h5>
                                <tr>
                                <td>Track Number</td>
                                <td>: {ownship.id}</td>
                                </tr>
                                <tr>
                                <td>Track Number</td>
                                <td>: {ownship.id}</td>
                                </tr>
                                <tr>
                                <td>Environment</td>
                                <td>: {enumEnvironment[ownship.environment]}</td>
                                </tr>
                                <tr>
                                <td>Latitude</td>
                                <td>: {ownship.latitude}</td>
                                </tr>
                                <tr>
                                <td>Longitude</td>
                                <td>: {ownship.longitude}</td>
                                </tr>
                                <tr>
                                <td>Altitude</td>
                                <td>: {ownship.altitude}</td>
                                </tr>
                                <tr>
                                <td>Course</td>
                                <td>: {ownship.course}</td>
                                </tr>
                                <tr>
                                <td>Speed</td>
                                <td>: {ownship.speed}</td>
                                </tr>
                                <tr>
                                <td>Heading</td>
                                <td>: {ownship.heading}</td>
                                </tr>
                                <tr>
                                <td>Pitch</td>
                                <td>: {ownship.pitch}</td>
                                </tr>
                                <tr>
                                <td>Roll</td>
                                <td>: {ownship.roll}</td>
                                </tr>
                                <tr>
                                <td>Yaw</td>
                                <td>: {ownship.yaw}</td>
                                </tr>
                            </table>
                        </Popup>      
                        </Marker>
                    </div>
                )
        })
);
}

export default OwnUnitTrack;
