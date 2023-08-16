import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";
import  Axios  from "axios";

const defaultIcon = L.icon({
  iconUrl: "./iconAdsb.png",
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

const ADSBIcon = () => {
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

    const enumEnvironment = {
        1: "Air",
        2: "Surface",
        3: "Subsurface",
        4: "Land"
    }



  return (
    ADSBData.map((adsb, index) => {
        return (            
         
      <RotatedMarker
        position={[adsb.latitude, adsb.longitude]}
        rotationAngle={adsb.course}
        rotationOrigin="center"
        icon={defaultIcon}
      >
             <Popup>
             <table >
                                <h5><b>ADSB Track</b></h5>
                                
                                <tr>
                                <td><b>Track Mode</b></td>
                                <td><b>: {adsb.trackMode}</b></td>
                                </tr>
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
                            </table>
            </Popup>     
      </RotatedMarker>
        )
    })
 
  );
};

export default ADSBIcon;
