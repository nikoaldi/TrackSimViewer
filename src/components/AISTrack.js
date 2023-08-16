import  Axios  from "axios"
import React, { useEffect, useState, useCallback } from "react"
import '../App.css';
import {
    Marker,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'






function AISTrack(props) {


    // Ambil data Radar dari API Quarkus
    const [AISData, setAISData] = useState([]);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [heading, setHeading] = useState();


    // GET AIS TRACK
    const getAISTrack = async () => {
        try{
            let response = await Axios.get('http://localhost:8080/ais')
            setAISData(response.data)
        } catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
    
        let interval = setInterval(() => {
            getAISTrack();
        },1000)
            
    }, [])

    const enumAisType = {
        1: "AIS Type 1",
        2: "AIS Type 2",
        3: "AIS Type 3"
    }

 

    var position = [];
    var angel = 0;

    return (        
        AISData.map((ais, index) => {
                position = [ais.latitude,ais.longitude]

                    return (            
                        <div key={index} namaUpdate={ais.id}> 
                        <script></script>
                            <Marker 
                                position={position}
                                icon={new Icon({iconUrl: './iconAis.png', iconSize: [20, 20]})}
                                key={ais.id}
                                rotationAngle={ais.course}
                                rotationOrigin="center"
                            >
                            <Popup>
                            <table >
                                <h5>AIS Track</h5>
                                <tr>
                                <td>Track Number</td>
                                <td>: {ais.id}</td>
                                </tr>
                                <tr>
                                <td>AIS Type</td>
                                <td>: {enumAisType[ais.aisType]}</td>
                                </tr>
                                <tr>
                                <td>AIS Name</td>
                                <td>: Ais Name</td>
                                </tr>
                                <tr>
                                <td>MMSI Number</td>
                                <td>: {ais.mmsiNumber}</td>
                                </tr>
                                <tr>
                                <td>IMO Number</td>
                                <td>: {ais.imoNumber}</td>
                                </tr>
                                <tr>
                                <td>Latitude</td>
                                <td>: {ais.latitude}</td>
                                </tr>
                                <tr>
                                <td>Longitude</td>
                                <td>: {ais.longitude}</td>
                                </tr>
                                <tr>
                                <td>Course</td>
                                <td>: {ais.course}</td>
                                </tr>
                                <tr>
                                <td>Speed</td>
                                <td>: {ais.speed}</td>
                                </tr>
                                <tr>
                                <td>Time</td>
                                <td>: {ais.time}</td>
                                </tr>
                            </table>
                            </Popup>      
                            </Marker>
                        </div>
                    )
            })
    );
}

export default AISTrack;
