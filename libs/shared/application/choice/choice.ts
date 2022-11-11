import {ApiReadImage, Image, imageUpdateFactory} from "libs/shared/application/media/media";
import {ApiRessourceItem} from "libs/shared/application/api/api";

export interface Choice {
  content: string;
  image: ApiReadImage;
  totalVote: number;
}

export interface ApiUpdateChoice {
  content: string;
  image: Image;
}

export const apiUpdateChoiceFactory = (): ApiUpdateChoice =>
  ({content: "", image: imageUpdateFactory()})

export type ApiReadChoice = ApiRessourceItem<Choice>
