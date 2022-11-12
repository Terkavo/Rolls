import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchOfRolls, Roll } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class ListOfRollsService {
  Batches: BatchOfRolls[] = new Array();
  constructor(private http: HttpService) { }
  Upload(IsGetCounterparties: boolean = false, IsGetUsedUp: boolean = false): Observable<void> {
    let th = this
    return new Observable(observer => {
      this.http.SendGet(`BatchOfRolls/GetMany/?IsAtCounterparties=${IsGetCounterparties}&IsGetUsedUp=${IsGetUsedUp}`).subscribe({
        next(value) {
          let batches = plainToInstance(BatchOfRolls, value as Array<any>)
          batches.forEach(element => {
            element.ToClass();
          });
          th.Batches = batches;
          observer.next()
        },
      })
    })
  }
  UploadAtCounterparties(value: string) {
    let th = this
    return new Observable(observer => {
      this.http.SendGet(`BatchOfRolls/GetOnlyOneType/${value}`).subscribe({
        next(value) {
          let batches = plainToInstance(BatchOfRolls, value as Array<any>)
          batches.forEach(element => {
            element.ToClass();
          });
          th.Batches.СombineOnField(batches, "Id");
          observer.next();
        }
      })
    })
  }

  GetRolls(): AutonomousRoll[] {
    let arr: AutonomousRoll[] = new Array();
    this.Batches.forEach(element => {
      arr = arr.concat(element.GetAutonomousRoll());
    });
    return arr;
  }
  FindBatchOnRollsId(id: string): BatchOfRolls {
    let ret = this.Batches.find(x => x.Rolls.find(y => y.Id === id) !== undefined)
    if (ret === undefined)
      throw new Error();
    return ret;
  }
}
