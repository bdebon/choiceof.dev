import {useClient} from "libs/shared/application/api/client";
import UserToken from "libs/shared/application/user/user";

export interface UserConnection {
  email: string,
  password: string
}

export interface ApiTokenRead {token: string}

export function connection(userConnection: UserConnection) {
  return useClient().post<ApiTokenRead>('/authentication_token', userConnection)
}

useClient().interceptors.request.use(function (config) {
  if (config.headers && UserToken.isConnected()) {
    config.headers['Authorization'] = `Bearer ${UserToken.getToken()}`
  }

  return config;
});
