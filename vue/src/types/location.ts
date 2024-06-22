export type savedLocation = {
    coordinates: Array<number>,
    layer: string,
    title: string,
    id: string
}

export type currentLocation = {
    coordinates: Array<number>,
    bearing: number,
    zoom: number
}