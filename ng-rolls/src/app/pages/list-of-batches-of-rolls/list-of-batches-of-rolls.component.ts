import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { ListOfBatchesOfRollsService } from './list-of-batches-of-rolls.service';

@Component({
  selector: 'app-list-of-batches-of-rolls',
  templateUrl: './list-of-batches-of-rolls.component.html',
  styleUrls: ['./list-of-batches-of-rolls.component.scss']
})
export class ListOfBatchesOfRollsComponent implements OnInit {

  constructor(public Service: ListOfBatchesOfRollsService, private header: HeaderService) { }
  ReadyForRenderingEvent: Subject<void> = new Subject<void>();

  async ngOnInit(): Promise<void> {
    this.header.SetItem("Список пачек рулонов",()=>this.Service.Update());
    await this.Service.Update();
    this.ReadyForRenderingEvent.next();
  }
}
