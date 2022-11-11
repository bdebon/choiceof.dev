import jwtDecode, {JwtPayload} from "jwt-decode";
import {connection, UserConnection} from "libs/shared/application/user/user-client";

export function useUserToken(): typeof UserToken {
  return UserToken
}

// TODO: Convert Class to function stateless
export default class UserToken {
  constructor(private token: string | null = null) {
    if (token) {
      UserToken.setToken(token)
    }
  }

  static getToken(): null | string {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const content = localStorage.getItem('token')

    if (!content) return null

    return JSON.parse(content)
  }

  static setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token))
  }

  static connection(userConnection: UserConnection): Promise<UserToken> {
    return connection( userConnection)
      .then(response => {
        return new UserToken(response.data.token)
      })
  }

  static getUser(): JwtPayload | null {
    let token = UserToken.getToken()

    if (!token) return null

    return  jwtDecode<JwtPayload>(token)
  }

  static isConnected(): boolean {
    let user = UserToken.getUser()

    if (!user) return false;

    return !(!user?.exp
      || !(Date.now() <= user?.exp * 1000));
  }
}
