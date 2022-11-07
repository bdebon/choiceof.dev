import {ApiRessourceItem, useClient} from "./client";
import {AxiosResponse} from "axios";

export interface Image {
  "@id":      string;
  "@type":    string;
  contentUrl: string;
}

export interface AddMediaResponse extends ApiRessourceItem{
  contentUrl: string;
}

export function addMedia(file: string): Promise<AxiosResponse<AddMediaResponse>> {
  const formData = new FormData();
  formData.append('file', new Blob([file], { type: 'application/octet-stream' }));

  return useClient().post(
    '/api/media_objects',
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
  )
}
