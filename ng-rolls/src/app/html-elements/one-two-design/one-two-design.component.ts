import { Component, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-one-two-design',
  templateUrl: './one-two-design.component.html',
  styleUrls: ['./one-two-design.component.scss']
})
export class OneTwoDesignComponent implements OnInit {
  @Input() ReadyForRenderingEvent: Observable<void> | undefined;
  @Input() IsReadyForRendering: boolean = false
  @Input() LeftBlockHtml: TemplateRef<any>;
  private myObserver: any;
  private Id: string | null = null;
  IsHiddenLeftBlock: boolean;
  IsHiddenRightBlock: boolean;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let th = this;
    this.ReadyForRenderingEvent?.subscribe({
      next() {
        th.IsReadyForRendering = true;
      },
    })
    this.ResetId();
    this.myObserver = this.router.events.subscribe((params: Params) => {
      if (!(params instanceof NavigationEnd))
        return;
      this.ResetId();
    })
  }

  ngOnDestroy(): void {
    this.myObserver.unsubscribe();
  }
  ResetId() {
    try {
      this.route.firstChild!.paramMap.subscribe((x) => this.Id = x.get("id"));
    } catch {
      this.Id = null
    }
    this.onResize()
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 768) {
      if (this.Id == null) {
        this.IsHiddenLeftBlock = false;
        this.IsHiddenRightBlock = true;
      }
      else {
        this.IsHiddenLeftBlock = true;
        this.IsHiddenRightBlock = false;
      }
    }
    else {
      this.IsHiddenLeftBlock = false;
      this.IsHiddenRightBlock = false;
    }
  }
}
