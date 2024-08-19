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
import type { ServiceTypeModel } from './ServiceTypeModel';
import {
    ServiceTypeModelFromJSON,
    ServiceTypeModelFromJSONTyped,
    ServiceTypeModelToJSON,
} from './ServiceTypeModel';

/**
 * 
 * @export
 * @interface ServiceModel
 */
export interface ServiceModel {
    /**
     * 
     * @type {string}
     * @memberof ServiceModel
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof ServiceModel
     */
    geoJsonId?: number;
    /**
     * 
     * @type {string}
     * @memberof ServiceModel
     */
    serviceKey?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceModel
     */
    coordinates?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceModel
     */
    marinaId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceModel
     */
    mooringId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ServiceModel
     */
    distance?: number | null;
    /**
     * 
     * @type {ServiceTypeModel}
     * @memberof ServiceModel
     */
    serviceType?: ServiceTypeModel;
}

/**
 * Check if a given object implements the ServiceModel interface.
 */
export function instanceOfServiceModel(value: object): value is ServiceModel {
    return true;
}

export function ServiceModelFromJSON(json: any): ServiceModel {
    return ServiceModelFromJSONTyped(json, false);
}

export function ServiceModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceModel {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'geoJsonId': json['geoJsonId'] == null ? undefined : json['geoJsonId'],
        'serviceKey': json['serviceKey'] == null ? undefined : json['serviceKey'],
        'coordinates': json['coordinates'] == null ? undefined : json['coordinates'],
        'marinaId': json['marinaId'] == null ? undefined : json['marinaId'],
        'mooringId': json['mooringId'] == null ? undefined : json['mooringId'],
        'distance': json['distance'] == null ? undefined : json['distance'],
        'serviceType': json['serviceType'] == null ? undefined : ServiceTypeModelFromJSON(json['serviceType']),
    };
}

export function ServiceModelToJSON(value?: ServiceModel | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'geoJsonId': value['geoJsonId'],
        'serviceKey': value['serviceKey'],
        'coordinates': value['coordinates'],
        'marinaId': value['marinaId'],
        'mooringId': value['mooringId'],
        'distance': value['distance'],
        'serviceType': ServiceTypeModelToJSON(value['serviceType']),
    };
}

