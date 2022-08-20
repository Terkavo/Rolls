import { Injectable } from '@angular/core';
import { BatchesOfRolls } from '../pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  Batch: BatchesOfRolls;
  constructor() { }
  ElementToPrint:string=""
  print(type:string ){
    this.ElementToPrint=type
    setTimeout(()=>print(),100)
  }
}
