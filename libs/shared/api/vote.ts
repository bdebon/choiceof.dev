import {ApiRessourceItem, useClient} from "./client";

export interface Vote {
  id:       number;
  createAt: Date;
  choice:   string;
}

export type ApiRessourceVote = ApiRessourceItem & Vote

export function addVote(idChoice: string) {
  return useClient().post<ApiRessourceVote>('/api/votes', {
    choice: idChoice
  })
}
