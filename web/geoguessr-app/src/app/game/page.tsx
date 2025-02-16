import BasicMap from "@/components/BasicMap";
export default function Game() {
  return (
    <div>
      Game
      <div className="relative w-full h-screen">
        {/* Position the minimap at bottom-right */}
        <div className="absolute bottom-4 right-4 overflow-hidden z-10">
          <div className="w-full h-full transition-transform duration-300 hover:scale-100">
            <BasicMap />
          </div>
        </div>
      </div>

      
    </div>
  );
}
