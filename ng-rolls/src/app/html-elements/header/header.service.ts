import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _Item: string = "";
  get  Item(){
    return this._Item
  }
  private _IsResetButton: boolean = false;
  public get IsResetButton(): boolean {
    return this._IsResetButton;
  }
  private _EventsSubjectReboot: Subject<void> = new Subject<void>();
  public get EventsSubjectReboot(): Subject<void> {
    return this._EventsSubjectReboot;
  }
  constructor(private title:Title) { }
  SetItem(value:string,subjectReboot?:() => void){
    this.title.setTitle(value);
    this._Item = value;
    if(subjectReboot!=undefined){
      this._IsResetButton=true
      this._EventsSubjectReboot.subscribe({
        next() {
          subjectReboot()
        },
      })
    }
    else
    this._IsResetButton=false
  }
}
