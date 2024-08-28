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
 * @interface MooringTypeModel
 */
export interface MooringTypeModel {
    /**
     * 
     * @type {string}
     * @memberof MooringTypeModel
     */
    key?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MooringTypeModel
     */
    value?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MooringTypeModel
     */
    iconKey?: string | null;
}

/**
 * Check if a given object implements the MooringTypeModel interface.
 */
export function instanceOfMooringTypeModel(value: object): value is MooringTypeModel {
    return true;
}

export function MooringTypeModelFromJSON(json: any): MooringTypeModel {
    return MooringTypeModelFromJSONTyped(json, false);
}

export function MooringTypeModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): MooringTypeModel {
    if (json == null) {
        return json;
    }
    return {
        
        'key': json['key'] == null ? undefined : json['key'],
        'value': json['value'] == null ? undefined : json['value'],
        'iconKey': json['iconKey'] == null ? undefined : json['iconKey'],
    };
}

export function MooringTypeModelToJSON(value?: MooringTypeModel | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'key': value['key'],
        'value': value['value'],
        'iconKey': value['iconKey'],
    };
}

