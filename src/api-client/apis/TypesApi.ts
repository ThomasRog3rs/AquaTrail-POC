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
  IconModel,
  MarinaTypeModel,
  MooringTypeModel,
  ServiceTypeModel,
} from '../models/index';
import {
    IconModelFromJSON,
    IconModelToJSON,
    MarinaTypeModelFromJSON,
    MarinaTypeModelToJSON,
    MooringTypeModelFromJSON,
    MooringTypeModelToJSON,
    ServiceTypeModelFromJSON,
    ServiceTypeModelToJSON,
} from '../models/index';

/**
 * 
 */
export class TypesApi extends runtime.BaseAPI {

    /**
     */
    async typesIconsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IconModel>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Types/icons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IconModelFromJSON));
    }

    /**
     */
    async typesIconsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IconModel>> {
        const response = await this.typesIconsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async typesMarinaTypesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MarinaTypeModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Types/marina-types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MarinaTypeModelFromJSON(jsonValue));
    }

    /**
     */
    async typesMarinaTypesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MarinaTypeModel> {
        const response = await this.typesMarinaTypesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async typesMooringTypesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MooringTypeModel>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Types/mooring-types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MooringTypeModelFromJSON));
    }

    /**
     */
    async typesMooringTypesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MooringTypeModel>> {
        const response = await this.typesMooringTypesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async typesServiceTypesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ServiceTypeModel>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Types/service-types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceTypeModelFromJSON));
    }

    /**
     */
    async typesServiceTypesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ServiceTypeModel>> {
        const response = await this.typesServiceTypesGetRaw(initOverrides);
        return await response.value();
    }

}