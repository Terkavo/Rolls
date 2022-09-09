import { Injectable } from '@angular/core';
import { BatchOfRolls } from '../pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  Batches: BatchOfRolls[] = new Array();
  constructor() { }
  ElementToPrint: string = ""
  print(type: string) {
    this.ElementToPrint = type
    setTimeout(() => {
      print(); 
      this.ElementToPrint = "";
    }, 100);
  }
}
