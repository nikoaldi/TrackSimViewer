import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import '../App.css';
import {
    Marker,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'






function RadarTrack(props) {


    // Ambil data Radar dari API Quarkus
    const [radarData, setRadarData] = useState([]);


    //Data
    const [nama, setNama] = useState("");
    const [warna, setWarna] = useState("");
    const [koordinatX, setKoordinatX] = useState("");
    const [koordinatY, setKoordinatY] = useState("");
    const [deskripsi, setDeskripsi] = useState("");


    const [message, setMessage] = useState("");

    const [LetUpdate, setLetUpdate] = useState("");
    const [LongUpdate, setLongUpdate] = useState("");
    

    const [idUpdate, setIdUpdate] = useState();
    const [namaUpdate, setNamaUpdate] = useState("");
    const [warnaUpdate, setWarnaUpdate] = useState("");
    const [kordinatUpdateX, setKoordinatUpdateX] = useState(0);
    const [kordinatUpdateY, setKoordinatUpdateY] = useState(0);
    const [deskripsiUpdate, setDeskripsiUpdate] = useState("");
    const [messageUpdate, setMessageUpdate] = useState("");

    // GET RADAR TRACK
    const getRadarTrack = async () => {
        try{
            let response = await Axios.get('http://localhost:8080/radar')
            setRadarData(response.data)
        } catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
    
        let interval = setInterval(() => {
            getRadarTrack();
        },1000)
            
    }, [])
    
    const enumEnvironment = {
        1: "Air",
        2: "Surface",
        3: "Subsurface",
        4: "Land"
    }

    const enumAisType = {
        1: "AIS Type 1",
        2: "AIS Type 2",
        3: "AIS Type 3"
    }

    var position = [];

    return (        
        radarData.map((radar, index) => {
                position = [radar.latitude, radar.longitude]
                    return (            
                        <div key={index} namaUpdate={radar.id}> 
                        <script></script>
                            <Marker 
                                position={position}
                                icon={new Icon({iconUrl: './radar.png', iconSize: [60, 60]})}
                                key={radar.id}
                                rotationAngle={90}
                                rotationOrigin="center"
                            >
                                
                            <Popup>
                            <table >
                                <h5>Radar Track</h5>
                                <tr>
                                <td><b>Track Mode</b></td>
                                <td><b>: {radar.trackMode}</b></td>
                                </tr>
                                <tr>
                                <td>Track Number</td>
                                <td>: {radar.id}</td>
                                </tr>
                                <tr>
                                <td>Environment</td>
                                <td>: {enumEnvironment[radar.environment]}</td>
                                </tr>
                                <tr>
                                <td>Latitude</td>
                                <td>: {radar.latitude}</td>
                                </tr>
                                <tr>
                                <td>Longitude</td>
                                <td>: {radar.longitude}</td>
                                </tr>
                                <tr>
                                <td>Altitude</td>
                                <td>: {radar.altitude}</td>
                                </tr>
                                <tr>
                                <td>Course</td>
                                <td>: {radar.course}</td>
                                </tr>
                                <tr>
                                <td>Speed</td>
                                <td>: {radar.speed}</td>
                                </tr>
                                <tr>
                                <td>Time</td>
                                <td>: {radar.time}</td>
                                </tr>
                            </table>
                            </Popup>      
                            </Marker>
                        </div>
                    )
            })
    );
}

export default RadarTrack;
