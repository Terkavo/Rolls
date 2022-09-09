import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly Link: string = ""
  myHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.Link = environment.url;
    console.log(this.Link)
  }
  SetToken(token: string) {
    this.myHeaders = this.myHeaders.set('Authorization', "Bearer " + token)
  }
  SendGet(link: string): Observable<Object> {
    return new Observable(x => {
      let func = () => {
        this.http.get(`${this.Link}/${link}`, { headers: this.myHeaders }).subscribe({
          next(value) {
            x.next(value)
          },
          error(err) {
            x.error(err)
          },
        })
      }
      if (window.navigator.onLine)
        func();
      else
        window.addEventListener('online', () => func(), { once: true })
    })
  }
  SendPost(link: string, obj: any): Observable<Object> {
    return new Observable(x => {
      let func = () => {
        this.http.post(`${this.Link}/${link}`, obj, { headers: this.myHeaders }).subscribe({
          next(value) {
            x.next(value)
          },
          error(err) {
            x.error(err)
          },
        })
      }
      if (window.navigator.onLine)
        func();
      else
        window.addEventListener('online', () => func(), { once: true })
    })
  }
  getThisJson(link: string) {
    return this.http.get(`/assets/jsons/${link}.json`)
  }
}

