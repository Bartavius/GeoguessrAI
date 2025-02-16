import BasicMap from "@/components/BasicMap";
import CombinedMap from "@/components/CombinedMap";
import StreetView from "@/components/Streeview";
export default function Game() {
  return (
    <div>
      Game
      <hr />
      <div className="m-20 border-4" style={{"overflow": "hidden", "position": "relative"}}>
        <CombinedMap />
      </div>
    </div>
  );
}
