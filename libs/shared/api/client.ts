import axios, {AxiosInstance} from 'axios'
import UserToken from "../user/user";
import {apiUrl} from "./api.url";

export interface ApiRessource {
  '@id': string;
  '@type': string;
  id: number
}

export interface ApiRessourceItem extends ApiRessource{
  '@context': string;
}

export interface ApiRessourceCollection<Content> extends ApiRessourceItem {
  "hydra:member":     Content[];
  "hydra:totalItems": number;
}

export const useClient = (): AxiosInstance => {
  return Client.get().apiClient
}

export const mediaUrl = (url: string): string => {
  return apiUrl  + url;
}

export default class Client {
  public apiClient: AxiosInstance
  public static self: Client

  public constructor() {
    const headers = {
      accept: 'application/ld+json',
      'Content-Type': 'application/json'
    }

    this.apiClient = axios.create({
      baseURL: apiUrl,
      headers: headers,

    })

    this.apiClient.interceptors.request.use(function (config) {
      if (config.headers && UserToken.isConnected()) {
        config.headers['Authorization'] = `Bearer ${UserToken.getToken()}`
      }

      return config;
    });
  }

  public static get(): Client {
    if (this.self) {
      return this.self
    }

    const instance = new Client()
    this.self = instance
    return instance;
  }
}
