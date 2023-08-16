import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";
import  Axios  from "axios";

const defaultIcon = L.icon({
  iconUrl: "./iconOnUnit.png",
  iconSize: [20, 20],
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

const OnUnitIcon = () => {
    const [OwnshipData, setOwnshipData] = useState([]);

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



  return (
    OwnshipData.map((onunit, index) => {
        return (            
         
      <RotatedMarker
        position={[onunit.latitude, onunit.longitude]}
        rotationAngle={onunit.heading}
        rotationOrigin="center"
        icon={defaultIcon}
      >
             <Popup>
             <table >
                <h5><b>Ownunit Track</b></h5>
                <tr>
                <td><b>Track Mode</b></td>
                <td><b>: {onunit.trackMode}</b></td>
                </tr>
                <tr>
                <td>Track Number</td>
                <td>: {onunit.id}</td>
                </tr>
                <tr>
                <td>Environment</td>
                <td>: {enumEnvironment[onunit.environment]}</td>
                </tr>
                <tr>
                <td>Latitude</td>
                <td>: {onunit.latitude}</td>
                </tr>
                <tr>
                <td>Longitude</td>
                <td>: {onunit.longitude}</td>
                </tr>
                <tr>
                <td>Course</td>
                <td>: {onunit.course}</td>
                </tr>
                <tr>
                <td>Speed</td>
                <td>: {onunit.speed}</td>
                </tr>
                <tr>
                <td>Altitude</td>
                <td>: {onunit.altitude}</td>
                </tr>
                <tr>
                <td>Heading</td>
                <td>: {onunit.heading}</td>
                </tr>
                <tr>
                <td>Pitch</td>
                <td>: {onunit.pitch}</td>
                </tr>
                <tr>
                <td>Roll</td>
                <td>: {onunit.roll}</td>
                </tr>
                <tr>
                <td>Yaw</td>
                <td>: {onunit.yaw}</td>
                </tr>
            </table>
            </Popup>     
      </RotatedMarker>
        )
    })
 
  );
};

export default OnUnitIcon;
