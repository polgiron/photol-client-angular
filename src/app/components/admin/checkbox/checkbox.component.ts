import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  @Input() check: boolean = false;
  @Input() disabled: boolean = false;
  @Output() setCheckState: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  toggleCheck() {
    if (!this.disabled) {
      this.check = !this.check;
      this.setCheckState.emit(this.check);
      this.ref.markForCheck();
    }
  }
}
