import {ApiRessourceItem} from "libs/shared/application/api/api";

export interface Image {
  id?: number
  contentUrl: string;
}

export type ImageUpdate = Image

export const imageUpdateFactory = (): ImageUpdate => ({contentUrl: ''})

export type ApiReadImage = ApiRessourceItem<Image>

