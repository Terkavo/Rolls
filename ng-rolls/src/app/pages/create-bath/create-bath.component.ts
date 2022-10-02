import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@terka/my-lib';
import { HttpService } from 'src/app/http/http.service';
import { BatchOfRolls, Roll } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-create-bath',
  templateUrl: './create-bath.component.html',
  styleUrls: ['./create-bath.component.scss']
})
export class CreateBathComponent implements OnInit {
  Batch: BatchOfRolls = new BatchOfRolls();
  constructor(private http: HttpService, public Header: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.Header.SetItem("Добавить рулоны")
  }
  onSave() {
    let th = this
    this.http.SendPost(`Main/SaveBatchRolls`, th.Batch).subscribe({
      next(value: any) {
        th.router.navigate([`list-of-batches-of-rolls/${value.id}`]);
      },
    })
  }
}
