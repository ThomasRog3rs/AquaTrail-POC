import * as client from "@/api-client";

export type SearchPayload = {
    marina: string;
    service: string;
  };

// Define the type for each search type object
export type SearchType = {
    icon: string,
    title: string,
    active: boolean
};

//Define the type for sort options
export type sortOption = {
    name: string,
    active: boolean,
    id: number,
    enabled: boolean
}

export type filterOption = {
    serviceType: client.ServiceTypeModel,
    active: boolean
}