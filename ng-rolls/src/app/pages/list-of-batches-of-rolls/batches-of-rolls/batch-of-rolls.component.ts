import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { PrintService } from 'src/app/printer/print.service';
import { BatchOfRolls, ListOfBatchesOfRollsService } from '../list-of-batches-of-rolls.service';

@Component({
  selector: 'app-batch-of-rolls',
  templateUrl: './batch-of-rolls.component.html',
  styleUrls: ['./batch-of-rolls.component.scss']
})
export class BatchOfRollsComponent implements OnInit {
  private Id: string;
  Batch: BatchOfRolls;
  IsReadyForRendering: boolean = false;

  constructor(private route: ActivatedRoute, public PrintServise: PrintService, private router: Router,
    public Service: ListOfBatchesOfRollsService, private Printer: PrintService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {
      this.Id = params["id"]
      await this.UpdateInvoice()
      this.IsReadyForRendering = true
    });
  }
  async UpdateInvoice() {
    try {
      this.Batch = await this.Service.GetOnId(this.Id)
    } catch {
      this.router.navigate([`/list-of-batches-of-rolls/`])
    }
  }
  onPrintTag() {
    this.Printer.Batches.push(this.Batch)
    this.Printer.print("batch")
  }
  Change(){
    this.router.navigate([`/change-bath/${this.Id}`])
  }
}
