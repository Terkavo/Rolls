import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { PrintService } from 'src/app/printer/print.service';
import { BatchOfRolls, ListOfBatchesOfRollsService } from './list-of-batches-of-rolls.service';

@Component({
  selector: 'app-list-of-batches-of-rolls',
  templateUrl: './list-of-batches-of-rolls.component.html',
  styleUrls: ['./list-of-batches-of-rolls.component.scss']
})
export class ListOfBatchesOfRollsComponent implements OnInit {

  constructor(public Service: ListOfBatchesOfRollsService, private header: HeaderService, private Printer: PrintService) { }
  ReadyForRenderingEvent: Subject<void> = new Subject<void>();
  OnPrintBatches: BatchOfRolls[] = new Array;
  async ngOnInit(): Promise<void> {
    this.header.SetItem("Список пачек рулонов", () => this.Service.Update());
    await this.Service.Update();
    this.ReadyForRenderingEvent.next();
  }
  SetOnPrint(id: string) {
    let el = <BatchOfRolls>this.Service.Batches.find(x => x.Id === id)
    if (!this.OnPrintBatches.Exists(x => x.Id === id))
      this.OnPrintBatches.push(el)
    else
      this.OnPrintBatches.Remove(el)
  }
  IsChesced(id: string) {
    return this.OnPrintBatches.Exists(x => x.Id === id)
  }
  Print() {
    this.Printer.Batches = this.OnPrintBatches;
    this.Printer.print("batch");
  }
}
