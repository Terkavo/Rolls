import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from '@terka/my-lib';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  Logs: ILogElement[] = new Array();
  constructor(private http: HttpService,private header: HeaderService) { }
  Upload(): Observable<void> {
    let th = this
    return new Observable(observer => {
      this.http.SendGet("Main/GetLogs").subscribe({
        next(value: any) {
          th.Logs = value;
          observer.next()
        },
      })
    })
  }

  async ngOnInit(): Promise<void> {
    let th=this
    this.header.SetItem("Логи",()=>th.Upload().subscribe());
    this.Upload().subscribe();
  }

}
interface ILogElement {
  ParentId: string
  Name: string
  ExecutorLogin: string
  Text: string
  Time: string
}
