import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@terka/my-lib';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-list-of-counterparties',
  templateUrl: './list-of-counterparties.component.html',
  styleUrls: ['./list-of-counterparties.component.scss']
})
export class ListOfCounterpartiesComponent implements OnInit {
  IsReadyForRendering: boolean = false;
  Title: string;
  Titles: ICounterparties[] = new Array()
  Type: string = "In"
  public get CurrentCounterparty(): ICounterparties {
    return <ICounterparties>this.Titles.find(x => x.Type === this.Type);
  }
  constructor(private http: HttpService, private header: HeaderService,) { }

  ngOnInit(): void {
    this.header.SetItem("Редактирование: Контрагенты, Цвета, Материалы")
    let th = this
    this.http.SendGet(`Counterparties/GetAll`).subscribe({
      next(value: any) {
        th.Titles = value
        th.IsReadyForRendering = true
      },
    })
  }
  Add() {
    let th = this
    this.http.SendGet(`Counterparties/Add/${this.Type}/${this.Title}`).subscribe({
      next() {
        th.CurrentCounterparty.ListCounterparties.unshift(th.Title);
        th.Title = "";
      },
    })
  }
}
export interface ICounterparties {
  Type: string
  ListCounterparties: string[]
}