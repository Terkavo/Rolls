import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  Item: string = ""
  IsResetButton: boolean = false;
  EventsSubjectReboot: Subject<void> = new Subject<void>();
  constructor() { }
}
