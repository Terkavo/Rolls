import { Injectable } from '@angular/core';
import { Cookies, getCookie, setCookie } from 'typescript-cookie'
import { HttpService } from '../http/http.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isAuthorization: boolean = false
  FullAccess: boolean = false
  CanSetRollIsUsedUp: boolean = false
  get Token() {
    let token = getCookie('token');
    if (token == undefined) {
      this.isAuthorization = false
      throw new Error();
    }
    return token;
  }
  constructor(private http: HttpService) {
    try {
      http.SetToken(this.Token)
      this.CheckToken()
      this.isAuthorization = true
    }
    catch {
      this.isAuthorization = false
    }
  }
  SetToken(value: string) {
    setCookie('token', value, { expires: 100 });
    this.isAuthorization = true;
    this.http.SetToken(this.Token)
  }
  CheckToken() {
    let th = this;
    this.http.SendGet("Authorization/UpdateToken")
      .subscribe({
        next(res: any) {
          th.SetToken(res.Token)
          th.FullAccess = res.FullAccess
          th.CanSetRollIsUsedUp = res.CanSetRollIsUsedUp
        },
        error(err) {
          if (err.status === 401 || err.status === 500)
            th.isAuthorization = false;
        }
      })
  }
}
