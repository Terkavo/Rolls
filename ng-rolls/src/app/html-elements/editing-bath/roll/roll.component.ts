import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Roll } from 'src/app/pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';
@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit {
  @Input("Roll") RollItem: Roll;
  @Input("Index") Index: number;

  public get Quantity(): number {
    return Number.parseFloat(this.RollItem.Quantity);
  }
  public set Quantity(value: number) {
    this.RollItem.Quantity = value.toString();
  }
  constructor() { }

  ngOnInit(): void {
  }
}
