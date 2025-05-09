import L from 'leaflet'
import AccidentImg from '../../assets/icons/accident.png'
import ClosedRoadImg from '../../assets/icons/barree.png'
import TrafficJamImg from '../../assets/icons/embouteillage.png'
import PoliceImg from '../../assets/icons/police.png'
import ObstacleImg from '../../assets/icons/barriere.png'

import StartImg from '../../assets/icons/start.png'
import PointImg from '../../assets/icons/point.png'
import FinishImg from '../../assets/icons/finish.png'

const AccidentIcon = new L.Icon({
    iconUrl: AccidentImg,
    iconSize: [20, 20],
})

const ClosedRoadIcon = new L.Icon({
    iconUrl: ClosedRoadImg,
    iconSize: [20, 20],
})
const TrafficJamIcon = new L.Icon({
    iconUrl: TrafficJamImg,
    iconSize: [20, 20],
})
const PoliceIcon = new L.Icon({
    iconUrl: PoliceImg,
    iconSize: [20, 20],
})
const ObstacleIcon = new L.Icon({
    iconUrl: ObstacleImg,
    iconSize: [20, 20],
})

const typesMap: Record<number, L.Icon> = {
    1: AccidentIcon,
    2: ClosedRoadIcon,
    3: TrafficJamIcon,
    4: PoliceIcon,
    5: ObstacleIcon,
}

const startIcon = new L.Icon({
    iconUrl: StartImg,
    iconSize: [25, 25],
})

const pointIcon = new L.Icon({
    iconUrl: PointImg,
    iconSize: [25, 25],

})

const finishIcon = new L.Icon({
    iconUrl: FinishImg,
    iconSize: [25, 25],
})

export default {
    AccidentIcon,
    ClosedRoadIcon,
    TrafficJamIcon,
    PoliceIcon,
    ObstacleIcon,
    typesMap,

    startIcon,
    pointIcon,
    finishIcon,
}