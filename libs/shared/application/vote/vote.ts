import {ApiRessourceItem} from "libs/shared/application/api/client";

export interface Vote {
  createAt: Date;
  choice:   string;
}

export type ApiReadVote = ApiRessourceItem & Vote

