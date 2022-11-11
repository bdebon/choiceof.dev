import {useClient} from "libs/shared/application/api/client";
import {ApiReadVote} from "libs/shared/application/vote/vote";

export function addVote(idChoice: string) {
  return useClient().post<ApiReadVote>('/api/votes', {
    choice: idChoice
  })
}
