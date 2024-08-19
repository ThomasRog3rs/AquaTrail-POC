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


import * as runtime from '../runtime';
import type {
  GeoJsonModel,
} from '../models/index';
import {
    GeoJsonModelFromJSON,
    GeoJsonModelToJSON,
} from '../models/index';

export interface GeoJsonAllGetRequest {
    coordinates?: string;
    distance?: number;
}

export interface GeoJsonGeoJsonByIdGetRequest {
    id?: number;
}

export interface GeoJsonMarinasGetRequest {
    coordinates?: string;
    distance?: number;
}

export interface GeoJsonMooringsGetRequest {
    coordinates?: string;
    distance?: number;
}

export interface GeoJsonServicesGetRequest {
    coordinates?: string;
    distance?: number;
}

/**
 * 
 */
export class GeoJsonApi extends runtime.BaseAPI {

    /**
     */
    async geoJsonAllGetRaw(requestParameters: GeoJsonAllGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GeoJsonModel>> {
        const queryParameters: any = {};

        if (requestParameters['coordinates'] != null) {
            queryParameters['coordinates'] = requestParameters['coordinates'];
        }

        if (requestParameters['distance'] != null) {
            queryParameters['distance'] = requestParameters['distance'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GeoJson/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeoJsonModelFromJSON(jsonValue));
    }

    /**
     */
    async geoJsonAllGet(requestParameters: GeoJsonAllGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GeoJsonModel> {
        const response = await this.geoJsonAllGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async geoJsonGeoJsonByIdGetRaw(requestParameters: GeoJsonGeoJsonByIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GeoJsonModel>> {
        const queryParameters: any = {};

        if (requestParameters['id'] != null) {
            queryParameters['id'] = requestParameters['id'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GeoJson/geoJsonById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeoJsonModelFromJSON(jsonValue));
    }

    /**
     */
    async geoJsonGeoJsonByIdGet(requestParameters: GeoJsonGeoJsonByIdGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GeoJsonModel> {
        const response = await this.geoJsonGeoJsonByIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async geoJsonMarinasGetRaw(requestParameters: GeoJsonMarinasGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GeoJsonModel>> {
        const queryParameters: any = {};

        if (requestParameters['coordinates'] != null) {
            queryParameters['coordinates'] = requestParameters['coordinates'];
        }

        if (requestParameters['distance'] != null) {
            queryParameters['distance'] = requestParameters['distance'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GeoJson/marinas`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeoJsonModelFromJSON(jsonValue));
    }

    /**
     */
    async geoJsonMarinasGet(requestParameters: GeoJsonMarinasGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GeoJsonModel> {
        const response = await this.geoJsonMarinasGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async geoJsonMooringsGetRaw(requestParameters: GeoJsonMooringsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GeoJsonModel>> {
        const queryParameters: any = {};

        if (requestParameters['coordinates'] != null) {
            queryParameters['coordinates'] = requestParameters['coordinates'];
        }

        if (requestParameters['distance'] != null) {
            queryParameters['distance'] = requestParameters['distance'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GeoJson/moorings`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeoJsonModelFromJSON(jsonValue));
    }

    /**
     */
    async geoJsonMooringsGet(requestParameters: GeoJsonMooringsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GeoJsonModel> {
        const response = await this.geoJsonMooringsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async geoJsonServicesGetRaw(requestParameters: GeoJsonServicesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GeoJsonModel>> {
        const queryParameters: any = {};

        if (requestParameters['coordinates'] != null) {
            queryParameters['coordinates'] = requestParameters['coordinates'];
        }

        if (requestParameters['distance'] != null) {
            queryParameters['distance'] = requestParameters['distance'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GeoJson/services`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeoJsonModelFromJSON(jsonValue));
    }

    /**
     */
    async geoJsonServicesGet(requestParameters: GeoJsonServicesGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GeoJsonModel> {
        const response = await this.geoJsonServicesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
