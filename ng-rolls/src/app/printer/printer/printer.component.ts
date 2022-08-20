import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent implements OnInit {
  constructor(public PrintServise:PrintService) { }

  ngOnInit(): void {
  }
}
