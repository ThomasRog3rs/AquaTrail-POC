export type savedLocation = {
    coordinates: Array<number>,
    layer: string,
    title: string,
    id: string,
    imageUrl: string | undefined

}

export type location = {
    coordinates?: Array<number> | undefined,
    cp_id?: string | undefined,
    cp_route?: string | undefined,
    icon?: string | undefined,
    layer?: string | undefined,
    title?: string | undefined,
}

export type currentLocation = {
    coordinates: Array<number>,
    bearing: number,
    zoom: number
}