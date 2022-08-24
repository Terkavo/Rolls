import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _Item: string = "";
  public get Item(): string {
    return this._Item;
  }
  public set Item(value: string) {
    this.title.setTitle(value);
    this._Item = value;
  }
  IsResetButton: boolean = false;
  EventsSubjectReboot: Subject<void> = new Subject<void>();
  constructor(private title:Title) { }
}
