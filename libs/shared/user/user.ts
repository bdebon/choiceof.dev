import {useClient} from "../api/client";
import jwtDecode, {JwtPayload} from "jwt-decode";

interface User {
  name: string
}

export interface UserConnection {
  email: string,
  password: string
}

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

  static setToken(token): void {
    localStorage.setItem('token', JSON.stringify(token))
  }

  static connection(userConnection: UserConnection): Promise<UserToken> {
    return useClient().post('/authentication_token', userConnection)
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
