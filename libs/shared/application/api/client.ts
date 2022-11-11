import axios, {AxiosInstance} from 'axios'
import {apiUrl} from "libs/shared/application/api/api.url";

export interface ApiRessource {
  '@id': string
  '@type': string
  id: number
}

export interface ApiRessourceItem extends ApiRessource{
  '@context': string;
}

export interface ApiRessourceCollection<Content> extends ApiRessourceItem {
  "@context":         string;
  "@id":              string;
  "@type":            string;
  "hydra:member":     Content[];
  "hydra:totalItems": number;
}



const headers = {
  accept: 'application/ld+json',
  'Content-Type': 'application/json'
}

const client = axios.create({
  baseURL: apiUrl,
  headers: headers,
})

export const useClient = (): AxiosInstance => {
  return client
}
