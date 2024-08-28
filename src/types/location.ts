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

export type coordinate = {
    lat: number,
    long: number
}

export type service = {
    
}

//id, name, type, coordinates, canalplan_link, website, address, canal_name, notes, phone_number
export type marina = {
    id: string,
    name: string,
    type: string,
    coordinates: coordinate,
    website: string | undefined,
    address: string | undefined,
    canal_name: string | undefined,
    notes: string,
    phoneNumber: string
    services: Array<service>
}