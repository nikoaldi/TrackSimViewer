
import {
    WMSTileLayer,
} from 'react-leaflet';

function OLayer() {
    

    return (
        <WMSTileLayer
        layers={'latihangeo:jawa_transport'}
        url="http://localhost:8080/geoserver/latihangeo/wms?"
        format= {"image/png"}
        transparent = {true}
        />
    );
   
}
export default OLayer;

