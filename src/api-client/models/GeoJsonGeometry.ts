/* tslint:disable */
/* eslint-disable */
/**
 * AquaTrail_Data
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GeoJsonGeometry
 */
export interface GeoJsonGeometry {
    /**
     * 
     * @type {string}
     * @memberof GeoJsonGeometry
     */
    type?: string | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof GeoJsonGeometry
     */
    coordinates?: Array<number> | null;
}

/**
 * Check if a given object implements the GeoJsonGeometry interface.
 */
export function instanceOfGeoJsonGeometry(value: object): value is GeoJsonGeometry {
    return true;
}

export function GeoJsonGeometryFromJSON(json: any): GeoJsonGeometry {
    return GeoJsonGeometryFromJSONTyped(json, false);
}

export function GeoJsonGeometryFromJSONTyped(json: any, ignoreDiscriminator: boolean): GeoJsonGeometry {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'coordinates': json['coordinates'] == null ? undefined : json['coordinates'],
    };
}

export function GeoJsonGeometryToJSON(value?: GeoJsonGeometry | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'type': value['type'],
        'coordinates': value['coordinates'],
    };
}
