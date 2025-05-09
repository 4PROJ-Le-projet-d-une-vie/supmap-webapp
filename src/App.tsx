import './App.css'
import InteractiveMap from "./components/map/InteractiveMap.tsx";
import type {GISPoint, Incident, Point, Trip} from "./utils/types.ts";
import client from "./utils/axios.ts";
import {env} from "./config/env.ts";
import {useEffect, useState} from "react";

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

    return (
        <div className="w-screen h-screen">
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
    )
}

export default App
