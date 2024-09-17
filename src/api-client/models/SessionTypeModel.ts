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
 * @interface SessionTypeModel
 */
export interface SessionTypeModel {
    /**
     * 
     * @type {string}
     * @memberof SessionTypeModel
     */
    message?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SessionTypeModel
     */
    sessionId?: string | null;
}

/**
 * Check if a given object implements the SessionTypeModel interface.
 */
export function instanceOfSessionTypeModel(value: object): value is SessionTypeModel {
    return true;
}

export function SessionTypeModelFromJSON(json: any): SessionTypeModel {
    return SessionTypeModelFromJSONTyped(json, false);
}

export function SessionTypeModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): SessionTypeModel {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'] == null ? undefined : json['message'],
        'sessionId': json['sessionId'] == null ? undefined : json['sessionId'],
    };
}

export function SessionTypeModelToJSON(value?: SessionTypeModel | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'message': value['message'],
        'sessionId': value['sessionId'],
    };
}

