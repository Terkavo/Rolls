import { Directive, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../helper';

@Directive({
  selector: '[appMyRourerLink]'
})
export class MyRourerLinkDirective {
  @Input("appMyRourerLink") Route = '';
  constructor(elementRef: ElementRef<HTMLElement>, private router: Router) {
    elementRef.nativeElement.addEventListener("click", (e: Event) => {
      if (Helper.IsEventHasClass(e, "my-rourer-link-ignore"))
        return
      if (this.Route[0] === "/")
        this.router.navigate([this.Route])
      else
        this.router.navigate([router.url, this.Route])
    })
  }
}
