import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchOfRolls } from 'src/app/pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-rool-loader',
  templateUrl: './rool-loader.component.html',
  styleUrls: ['./rool-loader.component.scss']
})
export class RoolLoaderComponent implements OnInit {
  private _Value: string = "";
  public get Value(): string {
    return this._Value;
  }
  public set Value(value: string) {
    value = value.replace("R-", "");
    value = value.replace("К-", "");
    this._Value = value;
  }
  Roll: AutonomousRoll | null = null;
  Location: string = "";

  IsRollNotFiend: boolean = false;
  IsScannerBeingUsed: boolean = false
  IsLocationCorrect: boolean = false;
  IsSuccessfullySaved: boolean = false;
  IsLoaded: boolean = false;

  @Output("uploaded") UploadedEvent = new EventEmitter<AutonomousRoll>();
  @Output("badlyUploaded") BadlyUploadedEvent = new EventEmitter<void>();

  @Input() ThrowOffEvent: Observable<void> | undefined;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    let th = this;
    this.ThrowOffEvent?.subscribe({
      next() {
        th.Value = "";
        th.IsSuccessfullySaved = true
        th.IsLoaded = false
      },
    })
  }
  onKeyupMainInput(e: KeyboardEvent) {
    if (e.code != "Enter")
      return;
    this.getRoll();
  }
  getRoll() {
    let th = this;
    this.http.SendGet(`Main/GetRoll/R-${this.Value}`).subscribe({
      next(value: any) {
        th.IsLoaded = true
        let batch = plainToInstance(BatchOfRolls, value)
        batch.ToClass()
        th.Roll = batch.GetAutonomousRoll()[0];
        th.UploadedEvent.emit(th.Roll)
        th.IsSuccessfullySaved = false;
      },
      error(err: any) {
        if (err.status === 404) {
          th.Roll = null;
          th.IsLoaded = false;
          th.IsRollNotFiend = true;
          th.BadlyUploadedEvent.emit()
        }
      },
    })
  }
  onQrScanned(res: string) {
    this.Value = res;
    this.IsScannerBeingUsed = false
    this.getRoll();
  }
}
