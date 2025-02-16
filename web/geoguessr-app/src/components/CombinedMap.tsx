import BasicMap from "./BasicMap";
import StreetView from "./Streeview";

export default function CombinedMap() {
    return (
        <div className="map-over-street-view">
            <StreetView />
            <div style={{"position" : "absolute",  "bottom": "10%", "right": "1%"}}>
            <BasicMap /></div>
        </div>
    )
}