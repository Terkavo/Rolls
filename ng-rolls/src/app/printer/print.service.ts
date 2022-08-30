import { Injectable } from '@angular/core';
import { BatchOfRolls } from '../pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  Batch: BatchOfRolls;
  constructor() { }
  ElementToPrint:string=""
  print(type:string ){
    this.ElementToPrint=type
    setTimeout(()=>print(),100)
  }
}
