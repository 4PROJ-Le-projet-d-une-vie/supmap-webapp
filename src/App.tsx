import './App.css'
import MapView from "./components/MapView.tsx";

function App() {
    return (
        <div className="w-screen h-screen">
            <MapView
            onMapClick={(e) => {
                console.log(e.lat + ' | ' + e.lon)
            }}/>
        </div>
    )
}

export default App
