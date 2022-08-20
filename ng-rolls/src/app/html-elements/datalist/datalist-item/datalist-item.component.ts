import { Component, Input, OnInit } from '@angular/core';
import { DataListOptions } from '../datalist-companent/datalist.component';

@Component({
  selector: 'app-datalist-item',
  templateUrl: './datalist-item.component.html',
  styleUrls: ['./datalist-item.component.scss']
})
export class DatalistItemComponent implements OnInit {
  @Input("Option")
  Option: DataListOptions=new DataListOptions("","");
  constructor() { }
  ngOnInit(): void {
  }

}
