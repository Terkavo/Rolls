import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHtmlFor]'
})
export class HtmlForDirective {
  @Input("appHtmlForInput") input: HTMLInputElement;
  constructor(private elementRef: ElementRef) {
  }
  @HostListener('click', ["$event"]) onMouseLeave(e: Event) {
    if (e.composedPath().includes(this.input))
      return
    if (this.input.type === "checkbox")
      this.input.checked = !this.input.checked
    else
      this.input.checked = true
    let eventclick = new Event("click", { bubbles: false });
    this.input.dispatchEvent(eventclick);
    let eventChange = new Event("change", { bubbles: false });
    this.input.dispatchEvent(eventChange);
  }
}
