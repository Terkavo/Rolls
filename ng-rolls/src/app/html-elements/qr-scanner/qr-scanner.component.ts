import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit, OnDestroy {
  codeReader = new BrowserMultiFormatReader();
  @ViewChild('video') VideoHtml: ElementRef<HTMLVideoElement>
  @ViewChild('select') Select: ElementRef<HTMLSelectElement> | undefined

  @Output() CancelingScan = new EventEmitter<void>();
  @Output() Scanned = new EventEmitter<string>();
  VideoInputDevices: MediaDeviceInfo[] = new Array();
  ;
  constructor() { }
  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia({video: true})
    setTimeout(async () => {
      this.VideoInputDevices = await this.codeReader.listVideoInputDevices()
      if (this.VideoInputDevices.length === 0)
        return
      setTimeout(() => {
        if (this.Select !== undefined)
          this.Select.nativeElement.value = this.VideoInputDevices[0].label
        this.Start(this.VideoInputDevices[0])
      });

    }, 10);
  }
  Start(device: MediaDeviceInfo) {
    this.codeReader.decodeFromVideoDevice(device.deviceId, this.VideoHtml.nativeElement, (result, err) => {
      if (result) {
        this.Scanned.emit(result.getText());
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.codeReader.reset()
  }
  onClose() {
    this.CancelingScan.emit();
  }
  onChangeSelect(element: HTMLSelectElement) {

    console.log(element.value)
    let camera = this.VideoInputDevices.find(x => x.label === element.value)
    if (camera === undefined)
      throw new Error();
    this.codeReader.reset()
    this.Start(camera);
  }
}
