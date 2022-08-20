import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as code from 'qrcode';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit, AfterViewInit {
  @Input("Value") Value: string
  @ViewChild('items') Canvas: ElementRef<HTMLCanvasElement>
  IsQrReady:boolean=false;
  QrUrl:string;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    code.toDataURL(this.Value).then(url=>{
      this.QrUrl=url;
      this.IsQrReady=true
    })
  }
}
