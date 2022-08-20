import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Roll } from '../../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit {
  @Input("Roll") RollItem: Roll;
  @Input("Index") Index: number;

  public get Quantity(): string {
    return this.RollItem.Quantity;
  }
  public set Quantity(value: string) {
    let num = Number.parseInt(value);
    if (Number.isNaN(num))
      return
    this.RollItem.Quantity = value;
  }
  constructor() { }

  ngOnInit(): void {
  }
}
