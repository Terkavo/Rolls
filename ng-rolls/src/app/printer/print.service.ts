import { Injectable } from '@angular/core';
import { AutonomousRoll, BatchOfRolls } from '../pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  Batches: BatchOfRolls[] = new Array();
  Roll: AutonomousRoll;
  constructor() { }
  ElementToPrint: string = ""
  print(type: string) {
    this.ElementToPrint = type
    setTimeout(() => {
      print();
      setTimeout(() => this.ElementToPrint = "",3000)
    }, 10);
  }
}
