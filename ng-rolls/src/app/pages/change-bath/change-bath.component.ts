import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { BatchOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-change-bath',
  templateUrl: './change-bath.component.html',
  styleUrls: ['./change-bath.component.scss']
})
export class ChangeBathComponent implements OnInit {
  Id: string;
  IsReadyForRendering: boolean;
  Batch: BatchOfRolls;

  constructor(private http: HttpService, private Header: HeaderService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.Header.SetItem("Редактирование пачки")
    this.route.params.subscribe(async (params: Params) => {
      this.Id = params["id"]
      this.Uploade();
    });
  }
  Uploade() {
    let th = this;
    this.http.SendGet(`Main/GetBatchOfRolls/${this.Id}`).subscribe({
      next(value: any) {
        th.Batch = plainToInstance(BatchOfRolls, value);
        th.Batch.ToClass();
        th.IsReadyForRendering = true
      }
    })
  }
  onSave() {
    let th = this;
    this.http.SendPost(`Main/UpdateBatchOfRolls`,this.Batch).subscribe({
      next() {
        th.router.navigate([`/list-of-batches-of-rolls/${th.Batch.Id}`])
      }
    })
   }
}
