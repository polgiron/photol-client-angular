import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: "[preventDefaultClick]"
})
export class PreventDefaultClickDirective {
  @HostListener('click', ['$event'])

  public onClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
