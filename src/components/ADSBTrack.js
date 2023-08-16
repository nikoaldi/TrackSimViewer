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






function ADSBTrack(props) {


    // Ambil data ADSB dari API Quarkus
    const [ADSBData, setADSBData] = useState([]);



    // GET ADSB TRACK
    const getADSBTrack = async () => {
        try{
            let response = await Axios.get('http://localhost:8080/adsb')
            setADSBData(response.data)
        } catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
    
        let interval = setInterval(() => {
            getADSBTrack();
        },1000)
            
    }, [])
    

    var position = [];

    return (        
        ADSBData.map((adsb, index) => {
                position = [adsb.latitude, adsb.longitude]
                    return (            
                        <div key={index} namaUpdate={adsb.id}> 
                        <script></script>
                            <Marker 
                                position={position}
                                icon={new Icon({iconUrl: './tank1.png', iconSize: [60, 60]})}
                                key={adsb.id}
                            >
                            <Popup>
                            <table >
                                <h5>ADSB Track</h5>
                                <tr>
                                <td>Track Number</td>
                                <td>: {adsb.id}</td>
                                </tr>
                                <tr>
                                <td>ICAO</td>
                                <td>: {adsb.icao}</td>
                                </tr>
                                <tr>
                                <td>Country</td>
                                <td>: {adsb.country}</td>
                                </tr>
                                <tr>
                                <td>Call Sign</td>
                                <td>: {adsb.callSign}</td>
                                </tr>
                                <tr>
                                <td>Position</td>
                                <td>: {adsb.position}</td>
                                </tr>
                                <tr>
                                <td>Heading</td>
                                <td>: {adsb.heading}</td>
                                </tr>
                                <tr>
                                <td>Vertical Rate</td>
                                <td>: {adsb.verticalRate}</td>
                                </tr>
                                <tr>
                                <td>Latitude</td>
                                <td>: {adsb.latitude}</td>
                                </tr>
                                <tr>
                                <td>Longitude</td>
                                <td>: {adsb.longitude}</td>
                                </tr>
                                <tr>
                                <td>Altitude</td>
                                <td>: {adsb.altitude}</td>
                                </tr>
                                <tr>
                                <td>Course</td>
                                <td>: {adsb.course}</td>
                                </tr>
                                <tr>
                                <td>Speed</td>
                                <td>: {adsb.speed}</td>
                                </tr>
                                <tr>
                                <td>Time</td>
                                <td>: {adsb.time}</td>
                                </tr>
                            </table>
                            </Popup>      
                            </Marker>
                        </div>
                    )
            })
    );
}

export default ADSBTrack;
