import BasicMap from "./BasicMap";
import StreetView from "./Streeview";

export default function CombinedMap() {
    return (
        <div className="map-over-street-view">
            <StreetView />
            <div style={{"position" : "absolute", "zIndex" : "100", "bottom": 20, "right": 0}}>
            <BasicMap /></div>
        </div>
    )
}