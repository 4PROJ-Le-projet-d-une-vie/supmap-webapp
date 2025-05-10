export type Point = {
    latitude: number
    longitude: number
}

export type GISPoint = {
    lat: number,
    lon: number
}

export interface AddressPoint extends Point {
    address: string
}

export type User = {
    id: number
    handle: string
}

export type Type = {
    id: number
    name: string
    description: string
}

export type InteractionSummary = {
    is_still_present: number
    no_still_present: number
    total: number
}

export type Incident = {
    id: number
    user: User
    type: Type
    lat: number
    lon: number
    created_at: Date
    updated_at: Date
    interactions_summary: InteractionSummary
    distance: number
}

export type TripSummary = {
    length: number
    time: number
}

export type Trip = {
    legs: Leg[]
    summary: TripSummary
}

export type Leg = {
    shape: Point[]
}

export type QRCodeData = {
    name: string
    locations: GISPoint[]
}