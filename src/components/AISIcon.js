import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";
import  Axios  from "axios";

const defaultIcon = L.icon({
  iconUrl: "./iconAis.png",
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

const AISIcon = () => {
    const [AISData, setAISData] = useState([]);
    const [lat, setLat] = useState(-6);
    const [lon, setLon] = useState(120);
    const [heading, setHeading] = useState(300);

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


  return (
    AISData.map((ais, index) => {
        return (            
         
      <RotatedMarker
        position={[ais.latitude, ais.longitude]}
        rotationAngle={ais.course}
        rotationOrigin="center"
        icon={defaultIcon}
      >
             <Popup>
                            <table >
                                <h5><b>AIS Track</b></h5>
                                <tr>
                                <td><b>Track Mode</b></td>
                                <td><b>: {ais.trackMode}</b></td>
                                </tr>
                                <tr>
                                <td>Track Number</td>
                                <td>: {ais.id}</td>
                                </tr>
                                <tr>
                                <td>AIS Type</td>
                                <td>: {ais.aisType}</td>
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
              
                            </table>
                            </Popup>     
      </RotatedMarker>
        )
    })
 
  );
};

export default AISIcon;
