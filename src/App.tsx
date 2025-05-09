import './App.css'
import InteractiveMap from "./components/map/InteractiveMap.tsx";
import type {GISPoint, Incident, Point, Trip} from "./utils/types.ts";
import client from "./utils/axios.ts";
import {env} from "./config/env.ts";
import {useEffect, useState} from "react";
import Navbar from "./components/Navbar.tsx";
import DashboardMetrics from "./components/DashboardMetrics.tsx";
import Footer from "./components/Footer.tsx";

const fetchIncidents = async (point: Point, radius: number): Promise<Incident[]> => {
    const res = await client.get(env.incidentsHost + "/incidents", {
        params: {
            include: "summary",
            lat: point.latitude,
            lon: point.longitude,
            radius: radius
        }
    })

    return res.data as Incident[]
}

const fetchGis = async (locations: GISPoint[]) => {
    const res = await client.post(env.gisHost + "/route", {
        alternates: 0,
        costing: "auto",
        costing_options: {},
        locations
    })

    return res.data.data as Trip[]
}

function App() {

    const [incidents, setIncidents] = useState<Incident[]>([])
    const [userPoints, setUserPoints] = useState<Point[]>([])
    const [shapes, setShapes] = useState<Point[]>([])

    useEffect(() => {
        fetchIncidents({ latitude: 49.181990815786556, longitude: -0.37112898487149654 }, 40_000)
            .then(res => setIncidents(res))
    }, [])

    const clearRoute = () => {
        setUserPoints([])
        setShapes([])
    }

    return (
        <div className="w-screen h-screen bg-gray-50">
            <Navbar/>
            <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6" style={{ height: 'calc(100vh - 144px)' }}>
                {/* Map container */}
                <div className="w-full lg:w-3/4 rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: 'calc(100% - 12px)' }}>
                    <InteractiveMap
                        incidents={incidents}
                        setIncidents={setIncidents}
                        fetchIncidents={fetchIncidents}
                        userPoints={userPoints}
                        setUserPoints={setUserPoints}
                        shapes={shapes}
                        setShapes={setShapes}
                        fetchGis={fetchGis}
                    />
                </div>

                {/* Dashboard panel with metrics */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6 overflow-y-auto">
                    <DashboardMetrics
                        incidents={incidents}
                        userPoints={userPoints}
                        shapes={shapes}
                        clearRoute={clearRoute}
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default App
