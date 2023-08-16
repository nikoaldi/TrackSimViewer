import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";
import  Axios  from "axios";



const defaultIcon = L.icon({
  iconUrl: "./iconRadar.png",
  iconSize: [17, 17],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10]
});

const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
const markerRef = useRef();

const { rotationAngle, rotationOrigin } = props;

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
      marker.setRotationOrigin(rotationOrigin);
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );
});

const RadarIcon = () => {
    const [radarData, setRadarData] = useState([]);

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



  return (
    radarData.map((radar, index) => {
        return (            
         
      <RotatedMarker
        position={[radar.latitude, radar.longitude]}
        rotationAngle={radar.course}
        rotationOrigin="center"
        icon={defaultIcon}
      >
             <Popup>
             <table >
                <h5><b>Radar Track</b></h5>
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
                <td>Bearing</td>
                <td>: {radar.bearing}</td>
                </tr>
                <tr>
                <td>Distance</td>
                <td>: {radar.distance}</td>
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
                <td>Altitude</td>
                <td>: {radar.altitude}</td>
                </tr>
            
            </table>
            </Popup>     
      </RotatedMarker>
        )
    })
 
  );
};

export default RadarIcon;
