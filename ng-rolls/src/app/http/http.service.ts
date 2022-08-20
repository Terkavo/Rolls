import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AuthorizationService } from '../authorization/authorization.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly Link: string = ""
  myHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.Link=environment.url;
    console.log(this.Link)
  }
  SetToken(token:string){
    this.myHeaders = this.myHeaders.set('Authorization', "Bearer " + token)
  }
  SendGet(link: string) {
    return this.http.get(`${this.Link}/${link}`, { headers: this.myHeaders })
  }
  SendPost(link: string, obj: any) {
    return this.http.post(`${this.Link}/${link}`, obj, { headers: this.myHeaders })
  }
  getThisJson(link: string) {
    return this.http.get(`/assets/jsons/${link}.json`)
  }
}

