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
 * @interface LocationModel
 */
export interface LocationModel {
    /**
     * 
     * @type {string}
     * @memberof LocationModel
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationModel
     */
    readonly coordinates?: string | null;
}

/**
 * Check if a given object implements the LocationModel interface.
 */
export function instanceOfLocationModel(value: object): value is LocationModel {
    return true;
}

export function LocationModelFromJSON(json: any): LocationModel {
    return LocationModelFromJSONTyped(json, false);
}

export function LocationModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationModel {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'coordinates': json['coordinates'] == null ? undefined : json['coordinates'],
    };
}

export function LocationModelToJSON(value?: Omit<LocationModel, 'coordinates'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
    };
}
