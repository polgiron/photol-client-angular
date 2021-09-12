import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  @Input() check: boolean = false
  @Output() setCheckState: EventEmitter<boolean> = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  toggleCheck() {
    this.check = !this.check
    this.setCheckState.emit(this.check)
  }
}
